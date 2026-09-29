export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed."
        });
    }

    try {

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


        // Make sure required fields exist
        if (
            !discordUsername ||
            !robloxUsername ||
            !age ||
            !timezone ||
            !whyStaff
        ) {
            return res.status(400).json({
                success: false,
                message: "Required application information is missing."
            });
        }


        const webhookURL = process.env.APPLICATION_WEBHOOK_URL;

        if (!webhookURL) {
            console.error("APPLICATION_WEBHOOK_URL is missing.");

            return res.status(500).json({
                success: false,
                message: "Application webhook has not been configured."
            });
        }


        // Prevent Discord embed field limits causing failures
        function clean(value, max = 1000) {

            if (!value) {
                return "No response";
            }

            return String(value).substring(0, max);
        }


        const embed = {

            title: "📋 New Staff Application",

            description:
                `A new staff application has been submitted.\n\n` +
                `**Application Status:** 🟡 Pending`,

            color: 16753920,

            fields: [

                {
                    name: "Discord Username",
                    value: clean(discordUsername),
                    inline: true
                },

                {
                    name: "Roblox Username",
                    value: clean(robloxUsername),
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
                    name: "Why do you want to become staff?",
                    value: clean(whyStaff)
                },

                {
                    name: "Previous Experience",
                    value: clean(experience)
                },

                {
                    name: "Strengths",
                    value: clean(strengths)
                },

                {
                    name: "Random Deathmatch (RDM)",
                    value: clean(rdm)
                },

                {
                    name: "Vehicle Deathmatch (VDM)",
                    value: clean(vdm)
                },

                {
                    name: "Fail Roleplay (FRP)",
                    value: clean(frp)
                },

                {
                    name: "Scenario One",
                    value: clean(scenarioOne)
                },

                {
                    name: "Scenario Two",
                    value: clean(scenarioTwo)
                },

                {
                    name: "Staff Abuse Scenario",
                    value: clean(staffAbuse)
                },

                {
                    name: "Weekly Activity",
                    value: clean(activity)
                },

                {
                    name: "Review Agreement",
                    value:
                        reviewAgreement === "yes"
                            ? "✅ Yes"
                            : "❌ No",
                    inline: true
                },

                {
                    name: "Acceptance Agreement",
                    value:
                        acceptanceAgreement === "yes"
                            ? "✅ Yes"
                            : "❌ No",
                    inline: true
                }

            ],

            footer: {
                text: "Los Angeles Roleplay • Application System"
            },

            timestamp: new Date().toISOString()

        };


        const components = [

            {
                type: 1,

                components: [

                    {
                        type: 2,
                        style: 3,
                        label: "Accept",
                        custom_id: "application_accept"
                    },

                    {
                        type: 2,
                        style: 4,
                        label: "Deny",
                        custom_id: "application_deny"
                    }

                ]

            }

        ];


        const discordResponse = await fetch(webhookURL + "?wait=true", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: "Los Angeles Roleplay",
                embeds: [embed],
                components: components
            })

        });


        if (!discordResponse.ok) {

            const discordError =
                await discordResponse.text();

            console.error(
                "Discord webhook error:",
                discordError
            );

            return res.status(500).json({
                success: false,
                message: "Discord rejected the application."
            });

        }


        const discordMessage =
            await discordResponse.json();


        return res.status(200).json({

            success: true,

            message:
                "Your application has been submitted successfully.",

            applicationId:
                discordMessage.id

        });


    } catch (error) {

        console.error(
            "Application submission error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "An unexpected error occurred while submitting your application."

        });

    }

}