
import  { maskPrice, removeMaskPrice } from "../";

describe("Utils", () => {

    it("maskPrice pass string", async () => {
      expect(maskPrice("1111")).toBe("R$ 11,11");
    });

    it("maskPrice pass number", async () => {
        expect(maskPrice(1111)).toBe("R$ 11,11");
      });

    it("removeMaskPrice", async () => {
        expect(removeMaskPrice("R$ 11,11")).toBe("1111");
    });

});

