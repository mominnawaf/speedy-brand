import { useState, useContext } from 'react';
import { Card, CardContent, Chip, Typography, IconButton, Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { Delete, KeyboardArrowRight } from '@mui/icons-material';
import { Topic } from '../../types/topic.type';
import { keyWords } from '../../static';
import classes from './TopicCard.module.scss'
import TopicContext from '../../context/TopicContext';
import { useNavigate } from 'react-router-dom';

const TopicCard = ({ topic }: { topic: Topic }) => {
    const { id, name, keywords } = topic;
    const { deleteTopic } = useContext(TopicContext);
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);

    const handleDelete = () => {
        deleteTopic(id);
        setOpenDialog(false);
    };

    const writeUp = () => {
        navigate(`/write-up/${id}`);
    }

    const openDeleteDialog = () => {
        setOpenDialog(true);
    };

    const closeDeleteDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Card key={id} sx={{ width: "100%", margin: "1rem", display: "flex", backgroundColor: "#F5F5F5", padding: "8px", borderRadius: "10px" }} elevation={0}>
            <CardContent sx={{ flex: "1 1 auto", padding: "0px" }}>
                <div className={classes.nameContainer}>
                    {name}
                </div>
                <Typography variant="body1" component="div">
                    {keywords.map(keyword => (
                        <Chip
                            key={keyword}
                            label={keyword}
                            variant="outlined"
                            sx={{
                                color: keyWords.filter(k => k.value === keyword)[0]?.color,
                                borderColor: keyWords.filter(k => k.value === keyword)[0]?.color,
                                margin: "0.5rem",
                                fontWeight: "bold"
                            }}
                        />
                    ))}
                </Typography>
            </CardContent>
            <div className={classes.rightContainer}>
                <div className={classes.cardActions}>
                    <Button
                        onClick={writeUp}
                        variant='contained'
                        className={classes.writeUp}
                        endIcon={<KeyboardArrowRight />}
                        disableElevation>
                        Write
                    </Button>
                    <IconButton
                        onClick={openDeleteDialog}
                        sx={{ color: "red" }}
                    >
                        <Delete />
                    </IconButton>
                </div>
            </div>
            <Dialog open={openDialog} onClose={closeDeleteDialog}>
                <DialogTitle>Delete Topic</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this topic?
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog}>Cancel</Button>
                    <Button onClick={handleDelete} sx={{ color: "red" }}>Delete</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default TopicCard;
