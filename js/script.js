/* ========================================
   LOS ANGELES ROLEPLAY
======================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* ========================================
       MOBILE NAVIGATION
    ======================================== */

    const menuButton =
        document.getElementById("menuButton");

    const navLinks =
        document.getElementById("navLinks");


    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {

            navLinks.classList.toggle("open");

        });


        navLinks
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener("click", () => {

                    navLinks.classList.remove("open");

                });

            });

    }



    /* ========================================
       SCROLL REVEAL
    ======================================== */

    document.body.classList.add("reveal-ready");

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target
                                .classList
                                .add("visible");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }



    /* ========================================
       NAVBAR BACKGROUND ON SCROLL
    ======================================== */

    const navbar =
        document.querySelector(".navbar");


    window.addEventListener("scroll", () => {

        if (!navbar) return;


        if (window.scrollY > 30) {

            navbar.style.background =
                "rgba(5, 5, 6, 0.94)";

        } else {

            navbar.style.background =
                "rgba(5, 5, 6, 0.78)";

        }

    });



    /* ========================================
       STAFF APPLICATION SYSTEM
    ======================================== */

    const form =
        document.getElementById("staffApplication");


    if (form) {

        console.log(
            "Staff application system loaded!"
        );


        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                console.log(
                    "Application submit detected!"
                );


                const submitButton =
                    form.querySelector(
                        'button[type="submit"]'
                    );


                const originalButtonText =
                    submitButton
                        ? submitButton.textContent
                        : "Submit Application";


                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.textContent =
                        "Submitting...";

                }


                try {

                    /* ------------------------
                       COLLECT FORM DATA
                    ------------------------ */

                    const formData =
                        new FormData(form);


                    const data =
                        Object.fromEntries(
                            formData.entries()
                        );


                    console.log(
                        "Application data:",
                        data
                    );


                    /* ------------------------
                       SEND APPLICATION
                    ------------------------ */

                    const response =
                        await fetch(
                            "/api/submit-applications",
                            {

                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(data)

                            }
                        );


                    console.log(
                        "API response status:",
                        response.status
                    );


                    /* ------------------------
                       READ RESPONSE SAFELY
                    ------------------------ */

                    const responseText =
                        await response.text();


                    let result = {};


                    if (responseText) {

                        try {

                            result =
                                JSON.parse(
                                    responseText
                                );

                        } catch (parseError) {

                            console.warn(
                                "API returned non-JSON:",
                                responseText
                            );


                            /*
                               If the HTTP request itself
                               succeeded, don't tell the
                               applicant their application
                               failed just because the
                               response wasn't JSON.
                            */

                            if (response.ok) {

                                result = {
                                    success: true
                                };

                            } else {

                                throw new Error(
                                    "The application server returned an unexpected response."
                                );

                            }

                        }

                    }


                    /* ------------------------
                       CHECK FOR API ERROR
                    ------------------------ */

                    if (!response.ok) {

                        throw new Error(
                            result.message ||
                            "Application submission failed."
                        );

                    }


                    /* ------------------------
                       SUCCESS
                    ------------------------ */

                    console.log(
                        "Application submitted successfully."
                    );


                    form.reset();

const successScreen =
    document.getElementById(
        "applicationSuccess"
    );

if (successScreen) {

    successScreen.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

}


                    form.reset();


                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });


                } catch (error) {

                    /* ------------------------
                       ERROR
                    ------------------------ */

                    console.error(
                        "APPLICATION ERROR:",
                        error
                    );


                    alert(
                        "Your application could not be submitted.\n\n" +
                        error.message
                    );


                } finally {

                    /* ------------------------
                       RESTORE BUTTON
                    ------------------------ */

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.textContent =
                            originalButtonText;

                    }

                }

            }
        );

    }



    /* ========================================
       REGULATIONS SEARCH
    ======================================== */

    const ruleSearch =
        document.getElementById("ruleSearch");

    const rules =
        document.querySelectorAll(
            ".rule-card"
        );

    const noRules =
        document.getElementById("noRules");


    if (ruleSearch && rules.length > 0) {

        ruleSearch.addEventListener(
            "input",
            () => {

                const search =
                    ruleSearch.value
                        .toLowerCase()
                        .trim();


                let visibleRules = 0;


                rules.forEach((rule) => {

                    const ruleText =
                        rule.textContent
                            .toLowerCase();


                    if (
                        ruleText.includes(search)
                    ) {

                        rule.classList.remove(
                            "rule-hidden"
                        );

                        visibleRules++;

                    } else {

                        rule.classList.add(
                            "rule-hidden"
                        );

                    }

                });


                if (noRules) {

                    if (visibleRules === 0) {

                        noRules.classList.add(
                            "show"
                        );

                    } else {

                        noRules.classList.remove(
                            "show"
                        );

                    }

                }

            }
        );

    }


});
