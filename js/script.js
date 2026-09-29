/* ========================================
   LOS ANGELES ROLEPLAY
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* ========================================
           MOBILE NAVIGATION
        ======================================== */

        const menuButton =
            document.getElementById(
                "menuButton"
            );

        const navLinks =
            document.getElementById(
                "navLinks"
            );


        if (menuButton && navLinks) {

            menuButton.addEventListener(
                "click",
                () => {

                    navLinks.classList.toggle(
                        "open"
                    );

                }
            );


            navLinks
                .querySelectorAll("a")
                .forEach((link) => {

                    link.addEventListener(
                        "click",
                        () => {

                            navLinks
                                .classList
                                .remove("open");

                        }
                    );

                });

        }



        /* ========================================
           NAVBAR
        ======================================== */

        const navbar =
            document.querySelector(
                ".navbar"
            );


        window.addEventListener(
            "scroll",
            () => {

                if (!navbar) return;


                navbar.style.background =
                    window.scrollY > 30
                        ? "rgba(5, 5, 6, 0.94)"
                        : "rgba(5, 5, 6, 0.78)";

            }
        );



        /* ========================================
           SCROLL REVEAL
        ======================================== */

        document.body.classList.add(
            "reveal-ready"
        );


        const revealElements =
            document.querySelectorAll(
                ".reveal"
            );


        if (
            "IntersectionObserver" in window
        ) {

            const observer =
                new IntersectionObserver(

                    (entries, observer) => {

                        entries.forEach(
                            (entry) => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target
                                        .classList
                                        .add(
                                            "visible"
                                        );

                                    observer
                                        .unobserve(
                                            entry.target
                                        );

                                }

                            }
                        );

                    },

                    {
                        threshold: 0.12
                    }

                );


            revealElements.forEach(
                (element) => {

                    observer.observe(
                        element
                    );

                }
            );

        } else {

            revealElements.forEach(
                (element) => {

                    element.classList.add(
                        "visible"
                    );

                }
            );

        }



        /* ========================================
           APPLICATION SUCCESS
        ======================================== */

        const parameters =
            new URLSearchParams(
                window.location.search
            );


        if (
            parameters.get("submitted")
            === "true"
        ) {

            const applicationSection =
                document.getElementById(
                    "staff-application"
                );


            if (applicationSection) {

                applicationSection
                    .classList
                    .add(
                        "submitted-application"
                    );


                applicationSection.innerHTML = `

                    <div class="application-success-content">

                        <div class="success-checkmark">
                            ✓
                        </div>


                        <p class="success-label">
                            STAFF APPLICATION
                        </p>


                        <h1>
                            Application Received
                        </h1>


                        <p class="success-description">

                            Your application has been
                            successfully submitted to the
                            Los Angeles Roleplay Staff Team.

                        </p>


                        <div class="success-status-card">

                            <div
                                class="success-status-dot"
                            ></div>

                            <div>

                                <span>
                                    APPLICATION STATUS
                                </span>

                                <strong>
                                    Pending Review
                                </strong>

                            </div>

                        </div>


                        <div class="success-next">

                            <h3>
                                What happens next?
                            </h3>

                            <p>

                                Your application will now
                                be reviewed by the Los
                                Angeles Roleplay Staff Team.

                            </p>

                            <p>

                                Please remain patient.
                                Asking staff members to
                                review your application may
                                result in it being denied.

                            </p>

                        </div>


                        <div class="success-actions">

                            <a
                                href="/index.html"
                                class="success-primary"
                            >
                                Return Home
                            </a>

                            <a
                                href="https://discord.gg/EVZqjQpxMm"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="success-secondary"
                            >
                                Join Discord
                            </a>

                        </div>

                    </div>

                `;

            }

        }



        /* ========================================
           APPLICATION FORM
        ======================================== */

        const applicationForm =
            document.getElementById(
                "staffApplication"
            );


        if (applicationForm) {

            console.log(
                "LARP application system ready."
            );


            applicationForm.addEventListener(
                "submit",
                async (event) => {


                    event.preventDefault();


                    const submitButton =
                        applicationForm
                            .querySelector(
                                'button[type="submit"]'
                            );


                    const originalText =
                        submitButton
                            ? submitButton.textContent
                            : "Submit Application";


                    if (submitButton) {

                        submitButton.disabled =
                            true;

                        submitButton.textContent =
                            "Submitting...";

                    }


                    try {


                        /* ================================
                           FORM DATA
                        ================================ */

                        const formData =
                            new FormData(
                                applicationForm
                            );


                        const data =
                            Object.fromEntries(
                                formData.entries()
                            );



                        /* ================================
                           SEND
                        ================================ */

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
                                        JSON.stringify(
                                            data
                                        )

                                }
                            );



                        /* ================================
                           RESPONSE
                        ================================ */

                        const responseText =
                            await response.text();


                        let result = {};


                        try {

                            if (responseText) {

                                result =
                                    JSON.parse(
                                        responseText
                                    );

                            }

                        } catch {

                            throw new Error(
                                "The application server returned an invalid response."
                            );

                        }



                        /* ================================
                           ERROR
                        ================================ */

                        if (!response.ok) {

                            throw new Error(

                                result.message ||

                                "Application submission failed."

                            );

                        }



                        /* ================================
                           SUCCESS
                        ================================ */

                        if (
                            result.success !== true
                        ) {

                            throw new Error(
                                "Application submission could not be confirmed."
                            );

                        }


                        applicationForm.reset();


                        window.location.replace(
                            "/applications.html?submitted=true"
                        );


                    } catch (error) {


                        console.error(
                            "APPLICATION ERROR:",
                            error
                        );


                        alert(

                            "Your application could not be submitted.\n\n" +

                            error.message

                        );


                        if (submitButton) {

                            submitButton.disabled =
                                false;

                            submitButton.textContent =
                                originalText;

                        }

                    }

                }
            );

        }



        /* ========================================
           REGULATIONS SEARCH
        ======================================== */

        const ruleSearch =
            document.getElementById(
                "ruleSearch"
            );


        const rules =
            document.querySelectorAll(
                ".rule-card"
            );


        const noRules =
            document.getElementById(
                "noRules"
            );


        if (
            ruleSearch &&
            rules.length > 0
        ) {

            ruleSearch.addEventListener(
                "input",
                () => {

                    const search =
                        ruleSearch.value
                            .toLowerCase()
                            .trim();


                    let visibleRules = 0;


                    rules.forEach(
                        (rule) => {

                            const text =
                                rule.textContent
                                    .toLowerCase();


                            if (
                                text.includes(
                                    search
                                )
                            ) {

                                rule.classList
                                    .remove(
                                        "rule-hidden"
                                    );

                                visibleRules++;

                            } else {

                                rule.classList
                                    .add(
                                        "rule-hidden"
                                    );

                            }

                        }
                    );


                    if (noRules) {

                        noRules.classList
                            .toggle(
                                "show",
                                visibleRules === 0
                            );

                    }

                }
            );

        }


    }
);
