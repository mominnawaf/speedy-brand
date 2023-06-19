import React, { useContext, useState } from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Tabs,
    Tab,
    Chip,
    MenuItem,
    Autocomplete,
    DialogActions
} from "@mui/material";
import { KeyboardArrowRight } from '@mui/icons-material';
import NavBar from "../NavBar/NavBar";
import classes from "./Dashboard.module.scss";
import { tabHeader, Categories, keyWords } from "../../static";
import TopicContext from '../../context/TopicContext'
import toast from 'react-hot-toast';
import RenderTab from "./RenderTab";

interface KeyWords {
    label: string;
    value: string;
}

function Dashboard() {
    const [tabValue, setTabValue] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [topic, setTopic] = useState("");
    const [selectedKeyWords, setSelectedKeyWords] = useState<KeyWords[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const { addTopic, getAllTopics, getTopicsByCategory } = useContext(TopicContext)
    const allTopics = getAllTopics();
    const customTopics = getTopicsByCategory("Custom");
    const icpTopics = getTopicsByCategory("ICP");
    const productTopics = getTopicsByCategory("Product");
    const missionTopics = getTopicsByCategory("Mission");

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault();
        setTabValue(newValue);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setTopic(event.target.value);
    };

    const handleKeyWordChange = (
        event: React.SyntheticEvent,
        value: KeyWords[]
    ) => {
        event.preventDefault();
        setSelectedKeyWords(value);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSelectedCategory(e.target.value)
    }

    const handleSubmit = () => {
        if (topic.length === 0 && selectedKeyWords.length === 0 && selectedCategory.length === 0) {
            toast.error("All fields are required")
        }
        else {
            addTopic({
                id: new Date().getTime(),
                name: topic,
                category: selectedCategory,
                keywords: selectedKeyWords.map(k => k.value)
            })
            setDialogOpen(false);
            setTopic("");
            setSelectedKeyWords([]);
            setSelectedCategory("");
        }
    }

    return (
        <>
            <NavBar />
            <div className={classes.dashboardContainer}>
                <Typography
                    variant="h5"
                    component="h5"
                    className={classes.dashboardTitle}
                >
                    Categories
                </Typography>
                <div className={classes.tabHeaderContainer}>
                    <Tabs
                        value={tabValue}
                        onChange={handleChange}
                        TabIndicatorProps={{
                            style: {
                                background: "#FF5733",
                                height: "4px",
                                borderRadius: "10px",
                            },
                        }}
                    >
                        <Tab
                            label="All"
                            sx={tabHeader}
                        />
                        {
                            Categories.map(c => <Tab
                                key={c}
                                label={c}
                                sx={tabHeader}
                            />)
                        }
                    </Tabs>
                    <Button
                        variant="contained"
                        className={classes.addTopic}
                        onClick={handleDialogOpen}
                        disableElevation
                        endIcon={<KeyboardArrowRight />}
                    >
                        Add Topic
                    </Button>
                </div>
                {tabValue === 0 && <RenderTab topics={allTopics} />}
                {tabValue === 1 && <RenderTab topics={customTopics} />}
                {tabValue === 2 && <RenderTab topics={icpTopics} />}
                {tabValue === 3 && <RenderTab topics={missionTopics} />}
                {tabValue === 4 && <RenderTab topics={productTopics} />}
            </div>

            <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth>
                <DialogTitle>Add Item</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Topic"
                        variant="outlined"
                        fullWidth
                        value={topic}
                        onChange={handleTopicChange}
                        margin="normal"
                    />
                    <TextField
                        label="Category"
                        select
                        variant="outlined"
                        fullWidth
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        margin="normal"
                    >
                        {
                            Categories.map(c => <MenuItem value={c} key={c}>{c}</MenuItem>)
                        }
                    </TextField>
                    <Autocomplete
                        multiple
                        options={keyWords.map(key => { return { label: key.label, value: key.value } })}
                        getOptionLabel={(category) => category.label}
                        value={selectedKeyWords}
                        onChange={handleKeyWordChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Topics"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                        )}
                        renderTags={(value: KeyWords[], getTagProps) =>
                            value.map((option: KeyWords, index) => (
                                <Chip
                                    label={option.label}
                                    variant="outlined"
                                    style={{ borderColor: keyWords.filter(key => key.value === option.value)[0].color }}
                                    {...getTagProps({ index })}
                                />
                            ))
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleDialogClose}
                    >Cancel</Button>
                    <Button
                        variant="contained"
                        className={classes.addTopic}
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Dashboard;
