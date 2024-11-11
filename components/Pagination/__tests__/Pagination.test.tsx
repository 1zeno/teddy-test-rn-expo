
import {render} from "@testing-library/react-native"
import Pagination from "../";

describe("Pagination", () => {

    it("total less than 7", async () => {
        const {getAllByTestId} = render(
            <Pagination
                currentPage={1}
                handlePage={()=>{}}
                total={6}
            />)
        expect(getAllByTestId("pageButton").length).toBe(6)
    });

    it("total greater than 7 and currentPage less than 5", async () => {
        const { getAllByTestId} = render(
            <Pagination
                currentPage={4}
                handlePage={()=>{}}
                total={10}
            />)
        expect(getAllByTestId("pageButton").length).toBe(6)
    });

    it("total greater than 7 and currentPage less than 5", async () => {
        const { getAllByTestId} = render(
            <Pagination
                currentPage={4}
                handlePage={()=>{}}
                total={10}
            />)
        expect(getAllByTestId("pageButton").length).toBe(6)
    });

    it("total greater than 7 and currentPage is the last", async () => {
        const { getAllByTestId} = render(
            <Pagination
                currentPage={10}
                handlePage={()=>{}}
                total={10}
            />)
        expect(getAllByTestId("pageButton").length).toBe(3)
    });

    it("total greater than 7 and currentPage is the second to last", async () => {
        const { getAllByTestId} = render(
            <Pagination
                currentPage={9}
                handlePage={()=>{}}
                total={10}
            />)
        expect(getAllByTestId("pageButton").length).toBe(4)
    });

});

