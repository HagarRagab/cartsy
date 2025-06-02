import { getLocale } from "next-intl/server";

import HelpAccordionItem from "@/src/app/_components/shared/HelpAccordionItem";
import { helpFAQs } from "@/src/app/_utils/utils";
import { Accordion } from "@/src/components/ui/accordion";

async function HelpAccordion() {
    const locale = await getLocale();

    return (
        <div className="mt-8">
            {helpFAQs.map((questions) => (
                <div key={questions.title[locale]} className="mb-6">
                    <h2 className="font-semibold text-lg mb-2 flex gap-2 items-center">
                        <span className="bg-accent-100 p-3 rounded-full shadow-sm">
                            {questions.icon}
                        </span>{" "}
                        {questions.title[locale]}
                    </h2>
                    <Accordion type="single" collapsible className="w-full">
                        {questions.FAQs.map((question) => (
                            <HelpAccordionItem
                                key={question.question[locale]}
                                question={question.question[locale]}
                                answer={question.answer[locale]}
                            />
                        ))}
                    </Accordion>
                </div>
            ))}
        </div>
    );
}

export default HelpAccordion;
