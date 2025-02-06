import { openai } from "@/lib/openai";

export const generateActionPlan = async (systemPrompt: string, userData: string) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "user", content: systemPrompt },
                { role: "user", content: userData },
            ],
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error generating content:", error);
    }
};
