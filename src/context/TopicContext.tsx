/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState } from 'react';
import { Topic } from '../types/topic.type'

interface TopicContext {
    topics: Topic[] | [];
    getAllTopics: () => void;
    getTopicsByCategory: (category: string) => void;
    addTopic: (topic: Topic) => void;
    updateTopic: (topic: Topic) => void;
    deleteTopic: (id: number) => void;
    getTopicById: (id: number) => Topic;
}

const TopicContext = createContext<TopicContext>({
    topics: [],
    getTopicById: () => { return { id: 0, name: "", category: "", keywords: [] } },
    getAllTopics: () => { },
    getTopicsByCategory: () => { },
    addTopic: () => { },
    updateTopic: () => { },
    deleteTopic: () => { },

});

export const TopicProvider = ({ children }: { children: React.ReactNode }) => {

    const [topics, setTopics] = useState<Topic[]>([{
        id: 1,
        name: "I need to take very long to finish this",
        category: "Product",
        keywords: ["Science", "Product"]
    },
    {
        id: 2,
        name: "Developers guide to React and its newer features",
        category: "Custom",
        keywords: ["Science", "Product"]
    },
    {
        id: 3,
        name: "This is a dummy mission article",
        category: "Mission",
        keywords: ["Art", "Product"]
    },
    {
        id: 4,
        name: "I want to create a ICP",
        category: "ICP",
        keywords: ["Science", "Product"]
    }
]);
    const getAllTopics = () => topics
    const getTopicsByCategory = (category: string) => topics.filter(topic => topic.category === category)
    const addTopic = (topic: Topic) => {
        topic.created_at = new Date();
        topic.updated_at = new Date()
        setTopics([...topics, topic]);
    }
    const updateTopic = (topic: Topic) => {
        topic.updated_at = new Date();
        setTopics(topics.map(t => t.id === topic.id ? topic : t));
    }
    const deleteTopic = (id: number) => {
        setTopics(topics.filter(topic => topic.id !== id));
    }
    const getTopicById = (id: number) => topics.filter(topic => topic.id === id)[0]

    return (
        <TopicContext.Provider value={{ topics, getAllTopics, getTopicsByCategory, addTopic, updateTopic, deleteTopic, getTopicById }}>
            {children}
        </TopicContext.Provider>
    );
};

export default TopicContext;