export default async function handler(req, res) {

    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed."
        });
    }

    try {

        const webhookURL =
            process.env.APPLICATION_WEBHOOK_URL;


        // Check webhook exists
        if (!webhookURL) {

            console.error(
                "APPLICATION_WEBHOOK_URL is missing."
            );

            return res.status(500).json({
                success: false,
                message:
                    "The application webhook has not been configured."
            });

        }


        const {
            discordUsername,
            robloxUsername,
            age,
            timezone,
            whyStaff,
            experience,
            strengths,
            rdm,
            vdm,
            frp,
            scenarioOne,
            scenarioTwo,
            staffAbuse,
            activity,
            reviewAgreement,
            acceptanceAgreement
        } = req.body;


        // Clean text for Discord
        function clean(value, max = 1000) {

            if (
                value === undefined ||
                value === null ||
                value === ""
            ) {
                return "No response provided.";
            }

            return String(value)
                .substring(0, max);

        }


        // Basic validation
        if (
            !discordUsername ||
            !robloxUsername ||
            !age ||
            !timezone
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Required application information is missing."
            });

        }


        /* ========================================
           DISCORD EMBED
        ======================================== */

        const embed = {

            title:
                "New Staff Application",

            description:
                "**Application Status:** 🟡 Pending\n\n" +
                "A new staff application has been submitted through the Los Angeles Roleplay website.",

            color: 16753920,

            fields: [

                {
                    name: "Discord Username",
                    value: clean(
                        discordUsername
                    ),
                    inline: true
                },

                {
                    name: "Roblox Username",
                    value: clean(
                        robloxUsername
                    ),
                    inline: true
                },

                {
                    name: "Age",
                    value: clean(age),
                    inline: true
                },

                {
                    name: "Timezone",
                    value: clean(timezone),
                    inline: true
                },

                {
                    name:
                        "Why do you want to become staff?",

                    value:
                        clean(whyStaff)
                },

                {
                    name:
                        "Previous Staff Experience",

                    value:
                        clean(experience)
                },

                {
                    name:
                        "Strengths",

                    value:
                        clean(strengths)
                },

                {
                    name:
                        "Random Deathmatch (RDM)",

                    value:
                        clean(rdm)
                },

                {
                    name:
                        "Vehicle Deathmatch (VDM)",

                    value:
                        clean(vdm)
                },

                {
                    name:
                        "Fail Roleplay (FRP)",

                    value:
                        clean(frp)
                },

                {
                    name:
                        "Scenario One",

                    value:
                        clean(scenarioOne)
                },

                {
                    name:
                        "Scenario Two",

                    value:
                        clean(scenarioTwo)
                },

                {
                    name:
                        "Staff Abuse Scenario",

                    value:
                        clean(staffAbuse)
                },

                {
                    name:
                        "Weekly Activity",

                    value:
                        clean(activity)
                },

                {
                    name:
                        "Application Review Agreement",

                    value:
                        reviewAgreement === "yes"
                            ? "✅ Yes"
                            : "❌ No",

                    inline: true
                },

                {
                    name:
                        "Acceptance Agreement",

                    value:
                        acceptanceAgreement === "yes"
                            ? "✅ Yes"
                            : "❌ No",

                    inline: true
                }

            ],

            footer: {
                text:
                    "Los Angeles Roleplay • Staff Applications"
            },

            timestamp:
                new Date().toISOString()

        };


        /* ========================================
           SEND TO DISCORD
        ======================================== */

        const discordResponse =
            await fetch(webhookURL, {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    username:
                        "Los Angeles Roleplay",

                    embeds: [embed]

                })

            });


        /* ========================================
           DISCORD ERROR
        ======================================== */

        if (!discordResponse.ok) {

            const discordError =
                await discordResponse.text();


            console.error(
                "DISCORD ERROR:",
                discordResponse.status,
                discordError
            );


            return res.status(500).json({

                success: false,

                message:
                    "Discord rejected the application.",

                discordStatus:
                    discordResponse.status,

                discordError:
                    discordError

            });

        }


        /* ========================================
           SUCCESS
        ======================================== */

        return res.status(200).json({

            success: true,

            message:
                "Application submitted successfully."

        });


    } catch (error) {

        console.error(
            "APPLICATION API ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "An unexpected server error occurred."

        });

    }

}
