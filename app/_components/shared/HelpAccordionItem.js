import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

function HelpAccordionItem({ question, answer }) {
    return (
        <AccordionItem value={question}>
            <AccordionTrigger className="text-md">
                Q: {question}
            </AccordionTrigger>
            <AccordionContent className="font-semibold">
                A: {answer}
            </AccordionContent>
        </AccordionItem>
    );
}

export default HelpAccordionItem;
