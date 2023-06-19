import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TopicContext from '../../context/TopicContext'
import { Topic } from '../../types/topic.type'
import NavBar from '../NavBar/NavBar'
import RichTextEditor from 'react-rte';
import 'draft-js/dist/Draft.css';
import { Button, Chip } from '@mui/material'
import classes from './writeUp.module.scss'
import toast from 'react-hot-toast';
import { keyWords } from '../../static'


function WriteUp() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { getTopicById, updateTopic } = useContext(TopicContext)
    const [topic, setTopic] = useState<Topic | null>(null)
    const [editorState, setEditorState] = useState(() => RichTextEditor.createEmptyValue());

    useEffect(() => {
        if (id) {
            setTopic(getTopicById(Number(id)))
            setEditorState(RichTextEditor.createValueFromString(getTopicById(Number(id)).description || '', 'html'))
        }
    }, [getTopicById, id])


    const handleCancel = () => {
        navigate('/dashboard')
    }
    const saveTopic = () => {
        if (topic) {
            const t = topic
            t.description = editorState.toString('html')
            updateTopic(t)
            toast.success('Topic updated successfully')
            navigate('/dashboard')
        }
    }

    return (
        <>
            <NavBar />
            {
                topic &&
                <div className={classes.container}>
                    <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "2rem", fontWeight: "bold" }}>{topic.name}</p>
                    <div>
                        {topic.keywords.map(keyword => (
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
                    </div>
                    <RichTextEditor
                        value={editorState}
                        onChange={setEditorState}
                        className={classes.editor}
                        placeholder="Write something..."
                        autoFocus
                    />
                    <div className={classes.buttonContainer}>
                        <Button
                            onClick={saveTopic}
                            variant="contained"
                            className={classes.writeUp}
                        >Save</Button>
                        <Button
                            disableElevation
                            variant="outlined"
                            color='secondary'
                            onClick={handleCancel}
                            className={classes.button}>Cancel</Button>
                    </div>
                </div>
            }
        </>
    )
}

export default WriteUp