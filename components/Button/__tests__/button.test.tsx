
import {render} from "@testing-library/react-native"
import Button from "../";

describe("Button", () => {

    describe("Disabled", () => {
        it("variant filled", async () => {
            const {getByText} = render(
                <Button
                    text="Salvar"
                    variant="filled"
                    onPress={()=>{}}
                    disabled={true}
                />
            )
            expect(getByText("Salvar")).toBeTruthy();
          });
          it("variant outlined", async () => {
              const {getByText} = render(
                <Button
                    text="Salvar"
                    variant="outlined"
                    onPress={()=>{}}
                    disabled={true}
                />
            )
              expect(getByText("Salvar")).toBeTruthy();
          });
    })

    it("variant filled", async () => {
      const {getByText} = render(<Button text="Salvar" variant="filled" onPress={()=>{}} />)
      expect(getByText("Salvar")).toBeTruthy();
    });

    it("variant outlined", async () => {
        const {getByText} = render(<Button text="Salvar" variant="outlined" onPress={()=>{}} />)
        expect(getByText("Salvar")).toBeTruthy();
    });

});

