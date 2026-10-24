import { describe, expect, it } from "vitest";
import { truncateTail } from "../src/core/tools/truncate.ts";

describe("truncateTail limit reporting", () => {
	it.each(["abcdef", "previous\nabcdef", "abcdef\n", "가나다"])(
		"reports byte truncation for a partial line: %s",
		(content) => {
			const result = truncateTail(content, { maxLines: 1, maxBytes: 3 });
			expect(result.truncatedBy).toBe("bytes");
			expect(result.lastLinePartial).toBe(true);
			expect(result.content).toBe(content === "가나다" ? "다" : "def");
			expect(result.outputBytes).toBe(3);
		},
	);

	it("still reports the line limit when keeping a complete last line", () => {
		const result = truncateTail("first\nlast", { maxLines: 1, maxBytes: 10 });
		expect(result.truncatedBy).toBe("lines");
		expect(result.lastLinePartial).toBe(false);
		expect(result.content).toBe("last");
	});
});
