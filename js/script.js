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
       APPLICATION SUCCESS SCREEN
    ======================================== */

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const applicationSubmitted =
        urlParams.get("submitted");


    if (applicationSubmitted === "true") {

        const applicationPage =
            document.getElementById(
                "staff-application"
            );


        if (applicationPage) {

            applicationPage.innerHTML = `

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

                        Your application has been successfully
                        submitted to the Los Angeles Roleplay
                        Staff Team.

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

                            Your application will now be
                            reviewed by the Los Angeles
                            Roleplay Staff Team.

                        </p>


                        <p>

                            Please remain patient while your
                            application is being reviewed.

                            Asking staff members to review
                            your application may result in
                            your application being denied.

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
       STAFF APPLICATION SYSTEM
    ======================================== */

    const form =
        document.getElementById(
            "staffApplication"
        );


    if (form) {

        console.log(
            "Staff application system loaded!"
        );


        form.addEventListener(
            "submit",
            async (event) => {


                /* ========================================
                   STOP NORMAL FORM RELOAD
                ======================================== */

                event.preventDefault();


                console.log(
                    "Application submit detected!"
                );



                /* ========================================
                   SUBMIT BUTTON
                ======================================== */

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


                    /* ========================================
                       COLLECT APPLICATION DATA
                    ======================================== */

                    const formData =
                        new FormData(form);


                    const applicationData =
                        Object.fromEntries(
                            formData.entries()
                        );


                    console.log(
                        "Application data:",
                        applicationData
                    );



                    /* ========================================
                       SEND APPLICATION TO API
                    ======================================== */

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
                                        applicationData
                                    )

                            }
                        );



                    console.log(
                        "API response status:",
                        response.status
                    );



                    /* ========================================
                       READ API RESPONSE
                    ======================================== */

                    const responseText =
                        await response.text();


                    let result = {};


                    if (responseText) {

                        try {

                            result =
                                JSON.parse(
                                    responseText
                                );

                        } catch (error) {

                            console.warn(
                                "API returned non-JSON:",
                                responseText
                            );


                            /*
                                If the request succeeded
                                but the response wasn't JSON,
                                still allow the successful
                                application redirect.
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



                    /* ========================================
                       CHECK RESPONSE
                    ======================================== */

                    if (!response.ok) {

                        throw new Error(

                            result.message ||

                            "Application submission failed."

                        );

                    }



                    /* ========================================
                       APPLICATION SUCCESS
                    ======================================== */

                    console.log(
                        "Application submitted successfully!"
                    );


                    /*
                        Clear the application form.
                    */

                    form.reset();


                    /*
                        Redirect back to applications
                        with submitted=true.

                        The success-screen code above
                        will detect this and replace
                        the application with the
                        confirmation screen.
                    */

                    window.location.href =
                        "/applications.html?submitted=true";


                } catch (error) {


                    /* ========================================
                       APPLICATION ERROR
                    ======================================== */

                    console.error(
                        "APPLICATION ERROR:",
                        error
                    );


                    alert(

                        "Your application could not be submitted.\n\n" +

                        error.message

                    );



                    /*
                        Allow applicant to try again.
                    */

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
