import React from "react";
import SignInContainer from "../Modal/Login/SignInContainer";
import 'mutationobserver-shim';
import {fireEvent, render, screen} from "@testing-library/react";

const mockLogin = jest.fn((email, password) => {
    return Promise.resolve({ email, password });
});


describe("<SignInContainer />", () => {
    beforeEach(() => {
        render(<SignInContainer props={mockLogin} />);
    });
    it("should display required error when value of email is invalid", async () => {
        fireEvent.submit(screen.getByRole("button"));

        expect(await screen.findAllByLabelText("Email")).toHaveLength(1);
        expect(mockLogin).not.toBeCalled();
    });
    it("should display required error when value of password is invalid", async () => {
        fireEvent.submit(screen.getByRole("button"));

        expect(await screen.findAllByLabelText("Password")).toHaveLength(1);
        expect(mockLogin).not.toBeCalled();
    });
    it("should display matching error when email is invalid", async () => {
        fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
            target: {
                value: "test"
            }
        });

        fireEvent.input(screen.getByLabelText("Password"), {
            target: {
                value: "@Password12"
            }
        });

        fireEvent.submit(screen.getByRole("button"));

        expect(await screen.findAllByText("Invalid email")).toHaveLength(1);
        expect(mockLogin).not.toBeCalled();
        expect(screen.getByRole("textbox", { name: /email/i }).value).toBe("test");
        expect(screen.getByLabelText("Password").value).toBe("@Password12");
    });

    it("should display error when password is invalid", async () => {
        fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
            target: {
                value: "test@gmail.com"
            }
        });

        fireEvent.input(screen.getByLabelText("Password"), {
            target: {
                value: "pass"
            }
        });

        fireEvent.submit(screen.getByRole("button"));

        expect(await screen.findAllByText("Must Contain 8 Characters, One Lowercase, One Number and one special character"))
            .toHaveLength(1);
        expect(mockLogin).not.toBeCalled();
        expect(screen.getByRole("textbox", { name: /email/i }).value).toBe(
            "test@gmail.com"
        );
        expect(screen.getByLabelText("Password").value).toBe("pass");
    });
    it("should  display error when email is not match tietoevry", async () => {
        fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
            target: {
                value: "test@gmail.com"
            }
        });

        fireEvent.input(screen.getByLabelText("Password"), {
            target: {
                value: "@Password12"
            }
        });

        fireEvent.submit(screen.getByRole("button"));

        expect(await screen.findAllByText("Email must match tietoevry"))
            .toHaveLength(1);
        expect(mockLogin).not.toBeCalled();

    });

    it("should  display error if email is not confirmed", async () => {
        fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
            target: {
                value: "test@tietoevry.com"
            }
        });

        fireEvent.input(screen.getByLabelText("Password"), {
            target: {
                value: "@Password12"
            }
        });

        fireEvent.submit(screen.getByRole("button"));

        expect(await screen.findAllByText("Error: Unauthorized"))
            .toHaveLength(1);
        expect(mockLogin).not.toBeCalled();

    });

    it("should not display error if the email is confirmed", async () => {
        fireEvent.input(screen.getByRole("textbox", { name: /email/i }), {
            target: {
                value: "tieto@tietoevry.com"
            }
        });

        fireEvent.input(screen.getByLabelText("Password"), {
            target: {
                value: "@Password12"
            }
        });

        fireEvent.submit(screen.getByRole("button"));

        expect(await screen.findAllByText("Error: Unauthorized"))
            .toHaveLength(0);
        expect(mockLogin).toBeCalledWith("test@mail.com", "password");
        expect(screen.getByRole("textbox", { name: /email/i }).value).toBe("");
        expect(screen.getByLabelText("password").value).toBe("");
    });

});