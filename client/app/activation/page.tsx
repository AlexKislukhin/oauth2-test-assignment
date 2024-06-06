"use client";

export default function ActivationPage() {
    return (
        <div className="max-w-96">
            Usually this would be a page with a query param of a one-time-use
            randomly generated token sent to an email to validate that the
            account belongs to that person and would send a request to backend
            to write that to db. But since I could figure out how to mock it -
            you get this instead {":)"}
        </div>
    );
}
