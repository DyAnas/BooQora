import React from "react";
import SignUpContainer from "../Modal/Login/SignUpContainer";
import 'mutationobserver-shim';
import {fireEvent, render, screen} from "@testing-library/react";

const mockSignUp = jest.fn((firstName, lastName,  email, password, confirmPassword ) => {
    return Promise.resolve({firstName, lastName,  email, password, confirmPassword });

});

describe("<SignUpContainer />", () => {
    beforeEach(() => {
        render(<SignUpContainer props={mockSignUp} />);
    });
    it("should display required error when value of first name is invalid", async () => {
        fireEvent.submit(screen.getByRole("button"));

        expect(await screen.findAllByLabelText("FirstName")).toHaveLength(1);
        expect(mockSignUp).not.toBeCalled();
    });
    it("should display required error when value of last name is invalid", async () => {
        fireEvent.submit(screen.getByRole("button"));

        expect(await screen.findAllByLabelText("LastName")).toHaveLength(1);
        expect(mockSignUp).not.toBeCalled();
    });
    it("should display required error when value of email is invalid", async () => {
        fireEvent.submit(screen.getByRole("button"));

        expect(await screen.findAllByLabelText("Email")).toHaveLength(1);
        expect(mockSignUp).not.toBeCalled();
    });
    it("should display required error when value of password is invalid", async () => {
        fireEvent.submit(screen.getByRole("button"));

        expect(await screen.findAllByLabelText("Password")).toHaveLength(1);
        expect(mockSignUp).not.toBeCalled();
    });
    it("should display required error when value of Confirm password is invalid", async () => {
        fireEvent.submit(screen.getByRole("button"));

        expect(await screen.findAllByLabelText("Confirm Password")).toHaveLength(1);
        expect(mockSignUp).not.toBeCalled();
    });

    it("should display matching error when First Name and last name is invalid", async () => {
        fireEvent.input(screen.getByRole("textbox", { name: /firstName/i }), {
            target: {
                value: "test12"
            }
        });

        fireEvent.input(screen.getByLabelText("LastName"), {
            target: {
                value: "test12"
            }
        });
        fireEvent.input(screen.getByLabelText("Email"), {
            target: {
                value: "test@tietoevry.com"
            }
        });
        fireEvent.input(screen.getByLabelText("Password"), {
            target: {
                value: "@Test122"
            }
        });
        fireEvent.input(screen.getByLabelText("Confirm Password"), {
            target: {
                value: "@Test122"
            }
        });

        fireEvent.submit(screen.getByRole("button"));

        expect(await screen.findAllByText("Invalid First Name")).toHaveLength(1);
        expect(await screen.findAllByText("Invalid Last Name")).toHaveLength(1);
        expect(mockSignUp).not.toBeCalled();
        expect(screen.getByRole("textbox", { name: /firstName/i }).value).toBe("test12");
        expect(screen.getByLabelText("LastName").value).toBe("test12");
        expect(screen.getByLabelText("Email").value).toBe("test@tietoevry.com");
        expect(screen.getByLabelText("Password").value).toBe("@Test122");
        expect(screen.getByLabelText("Confirm Password").value).toBe("@Test122");
    });

    it("should display matching error when email and password is invalid", async () => {
        fireEvent.input(screen.getByRole("textbox", { name: /firstName/i }), {
            target: {
                value: "test"
            }
        });

        fireEvent.input(screen.getByLabelText("LastName"), {
            target: {
                value: "test"
            }
        });
        fireEvent.input(screen.getByLabelText("Email"), {
            target: {
                value: "test"
            }
        });
        fireEvent.input(screen.getByLabelText("Password"), {
            target: {
                value: "@Test"
            }
        });
        fireEvent.input(screen.getByLabelText("Confirm Password"), {
            target: {
                value: "@Test"
            }
        });

        fireEvent.submit(screen.getByRole("button"));

        expect(await screen.findAllByText("Invalid email")).toHaveLength(1);
        expect(await screen.findAllByText("Must Contain 8 Characters, One Lowercase, " +
            "One Number and one special character")).toHaveLength(1);
        expect(mockSignUp).not.toBeCalled();
        expect(screen.getByRole("textbox", { name: /firstName/i }).value).toBe("test");
        expect(screen.getByLabelText("LastName").value).toBe("test");
        expect(screen.getByLabelText("Email").value).toBe("test");
        expect(screen.getByLabelText("Password").value).toBe("@Test");
        expect(screen.getByLabelText("Confirm Password").value).toBe("@Test");
    });
    it("should display matching error when password and confirm password don't match", async () => {

        fireEvent.input(screen.getByLabelText("Password"), {
            target: {
                value: "@Test234"
            }
        });
        fireEvent.input(screen.getByLabelText("Confirm Password"), {
            target: {
                value: "@Test24333"
            }
        });

        fireEvent.submit(screen.getByRole("button"));
        expect(await screen.findAllByText("Passwords don't match.")).toHaveLength(1);
        expect(mockSignUp).not.toBeCalled();
        expect(screen.getByLabelText("Password").value).toBe("@Test234");
        expect(screen.getByLabelText("Confirm Password").value).toBe("@Test24333");
    });

    it("should  display error when email is not match tietoevry", async () => {
        fireEvent.input(screen.getByLabelText("FirstName"), {
            target: {
                value: "tests"
            }
        });

        fireEvent.input(screen.getByLabelText("LastName"), {
            target: {
                value: "test"
            }
        });
        fireEvent.input(screen.getByLabelText("Email"), {
            target: {
                value: "test@mail.com"
            }
        });
        fireEvent.input(screen.getByLabelText("Password"), {
            target: {
                value: "@Test122"
            }
        });
        fireEvent.input(screen.getByLabelText("Confirm Password"), {
            target: {
                value: "@Test122"
            }
        });

        fireEvent.submit(screen.getByRole("button"));

        expect(await screen.findAllByText("Email must match tietoevry"))
            .toHaveLength(1);
        expect(mockSignUp).not.toBeCalled();
        expect(screen.getByLabelText("FirstName").value).toBe("tests");
        expect(screen.getByLabelText("LastName").value).toBe("test");
        expect(screen.getByLabelText("Email").value).toBe("test@mail.com");
        expect(screen.getByLabelText("Password").value).toBe("@Test122");
        expect(screen.getByLabelText("Confirm Password").value).toBe("@Test122");
});

    it("should not display error if all input is correct", async () => {
        fireEvent.input(screen.getByLabelText("FirstName"), {
            target: {
                value: "tests"
            }
        });

        fireEvent.input(screen.getByLabelText("LastName"), {
            target: {
                value: "test"
            }
        });
        fireEvent.input(screen.getByLabelText("Email"), {
            target: {
                value: "test@tietoevry.com"
            }
        });
        fireEvent.input(screen.getByLabelText("Password"), {
            target: {
                value: "@Test122"
            }
        });
        fireEvent.input(screen.getByLabelText("Confirm Password"), {
            target: {
                value: "@Test122"
            }
        });

        fireEvent.submit(screen.getByRole("button"));


     //   expect(mockSignUp).toBeCalled();
        expect(mockSignUp).toBeCalledWith("tests", "test", "test@tietoevry.com", "password", "@Test122");
        expect(screen.getByLabelText("FirstName").value).toBe("");
        expect(screen.getByLabelText("LastName").value).toBe("");
        expect(screen.getByLabelText("Email").value).toBe("");
        expect(screen.getByLabelText("Password").value).toBe("");
        expect(screen.getByLabelText("Confirm Password").value).toBe("");
    });

});