import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

type Topic = {
  id: string;
  title: string;
  summary: string;
  comments: string[];
};

interface TopicAccordionProps {
  topics: Topic[];
}

const TopicAccordion: React.FC<TopicAccordionProps> = ({ topics }) => {
  return (
    <Accordion.Root
      type="multiple"
      className="w-full space-y-2"
    >
      {topics.map((topic) => (
        <Accordion.Item
          key={topic.id}
          value={topic.id}
          className="border rounded-md shadow-sm"
        >
          <Accordion.Header className="flex items-center justify-between px-4 py-3 bg-neutral-100 dark:bg-neutral-200 rounded-t-md cursor-pointer">
            <Accordion.Trigger className="flex justify-between w-full text-left text-sm font-medium">
              <span>{topic.title}</span>
              <ChevronDown className="h-4 w-4 transition-transform duration-200 AccordionChevron" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="px-4 py-3 text-sm text-gray-700 dark:text-gray-900 bg-white dark:bg-gray-100 rounded-b-md">
            <p className="mb-2 font-medium">Summary:</p>
            <p className="mb-4">{topic.summary}</p>
            <div>
              <p className="font-medium mb-1">Sample Comments:</p>
              <ul className="list-disc pl-5 space-y-1">
                {topic.comments.slice(0, 3).map((comment, index) => (
                  <li key={index} className="text-sm text-red-600 dark:text-red-400">
                    “{comment}”
                  </li>
                ))}
              </ul>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

export default TopicAccordion;
