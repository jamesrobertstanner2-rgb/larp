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
/* ========================================
   STAFF APPLICATION SUBMISSION
======================================== */

const staffApplication =
    document.getElementById(
        "staffApplication"
    );


if (staffApplication) {

    staffApplication.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const submitButton =
                staffApplication.querySelector(
                    'button[type="submit"]'
                );


            const originalButton =
                submitButton.innerHTML;


            submitButton.disabled = true;

            submitButton.innerHTML =
                "Submitting...";


            try {

                const formData =
                    new FormData(
                        staffApplication
                    );


                const applicationData =
                    Object.fromEntries(
                        formData.entries()
                    );


                const response =
                    await fetch(
                        "/api/submit-application",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    applicationData
                                )

                        }
                    );


                const result =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Submission failed."
                    );

                }


                alert(
                    "Application submitted successfully!\n\n"
                    + "Your application is now Pending and will be reviewed by the Los Angeles Roleplay staff team."
                );


                staffApplication.reset();


            } catch (error) {

                console.error(error);


                alert(
                    "Your application could not be submitted.\n\n"
                    + error.message
                );

            } finally {

                submitButton.disabled = false;

                submitButton.innerHTML =
                    originalButton;

            }

        }
    );

}
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

});/* ========================================
   REGULATIONS SEARCH
======================================== */

const ruleSearch =
    document.getElementById("ruleSearch");

const rules =
    document.querySelectorAll(".rule-card");

const noRules =
    document.getElementById("noRules");


if (ruleSearch && rules.length > 0) {

    ruleSearch.addEventListener("input", () => {

        const search =
            ruleSearch.value
                .toLowerCase()
                .trim();

        let visibleRules = 0;


        rules.forEach((rule) => {

            const ruleText =
                rule.textContent.toLowerCase();


            if (ruleText.includes(search)) {

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

                noRules.classList.add("show");

            } else {

                noRules.classList.remove("show");

            }

        }

    });

}// ==========================================
// STAFF APPLICATION SYSTEM
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("staffApplication");

    if (!form) {
        console.log("Staff application form not found.");
        return;
    }

    console.log("Staff application system loaded!");

    form.addEventListener("submit", async function (event) {

        // STOP THE PAGE RELOADING
        event.preventDefault();

        console.log("Application submit detected!");

        const submitButton =
            form.querySelector('button[type="submit"]');

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
        }

        try {

            const formData = new FormData(form);

            const data =
                Object.fromEntries(formData.entries());

            console.log("Application data:", data);


            const response = await fetch(
                "/api/submit-applications",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(data)
                }
            );


            console.log(
                "API response status:",
                response.status
            );


            const result = await response.json();

            console.log(
                "API response:",
                result
            );


            if (!response.ok) {
                throw new Error(
                    result.message ||
                    "Application submission failed."
                );
            }


            alert(
                "Your application has been submitted successfully!"
            );

            form.reset();


        } catch (error) {

            console.error(
                "APPLICATION ERROR:",
                error
            );

            alert(
                "Your application could not be submitted.\n\n" +
                error.message
            );

        } finally {

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent =
                    "Submit Application";
            }

        }

    });

});