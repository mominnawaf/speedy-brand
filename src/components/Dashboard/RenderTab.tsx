import TopicCard from "../TopicCard/TopicCard";

const TabContent = ({ topics }: { topics: any }) => {
    if (Array.isArray(topics) && topics?.length > 0) {
        return topics?.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
        ));
    } else {
        return <p>No articles found</p>;
    }
};

export default TabContent;
