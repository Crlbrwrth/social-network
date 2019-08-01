import React from "react";
import BioEditor from "./bioeditor";
import axios from "./axios";
import { render, fireEvent, waitForElement } from "@testing-library/react";

// test("Anything happens", () => {
//     const a = 5;
//     expect(a).toBe(5);
// });
//
// test("When no bio is passed to it, an Add-button is rendered.", () => {
//     const { container } = render(<BioEditor />);
//     expect(container.querySelector("button").innerHTML).toBe(
//         "Update Biography"
//     );
// });
//
// test("When a bio is passed to it, an Edit-button is rendered.", () => {
//     const { container } = render(<BioEditor bio="text" />);
//     expect(container.querySelector("button").innerHTML).toBe(
//         "Update Biography"
//     );
// });
//
// test(`Clicking either the "Add" or "Edit" button causes a textarea and a "Save" button to be rendered.`, () => {
//     const { container } = render(<BioEditor />);
//     fireEvent.click(container.querySelector("button"));
//     expect(container.querySelector("button").innerHTML).toBe("Commit new Bio");
// });

jest.mock("axios");

test(`Clicking the "Save" button causes an ajax request.`, async () => {
    axios.post.mockResolvedValue({
        data: {
            changeBio: "Bio text"
        }
    });

    const { container } = render(<BioEditor />);
    fireEvent.click(container.querySelector("button"));
    expect(container.getElementByClassName("bio-text").innerHTML).toBe(
        "Bio text"
    );
});

// function findOdd(A) {
//     var arr = A.sort();
//     let counter = 0;
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] == arr[i + 1]) {
//             counter++;
//         } else {
//             if (counter % 2 == 1) {
//                 return arr[i];
//             } else {
//                 counter = 0;
//             }
//         }
//     }
// }
