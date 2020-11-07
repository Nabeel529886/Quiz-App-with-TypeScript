import React, { useState } from 'react'
import { Card, Container,CardMedia,CardContent, CardActions, Typography, Button, Grid } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    root: {
        width: "60%",
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: "center",

        [theme.breakpoints.down("xs")]: {
            width: '100%',
            maxHeight: "100px",
        },
        [theme.breakpoints.down("sm")]: {
            width: '100%',
            maxHeight: "600px",
        },
    },
    mainhead: {
        alignSelf: "center",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2)
    },
    catCard: {
        padding: theme.spacing(1),
        boxShadow: "5px 5px 7px #777",
        height: '150px',
    },
    catCardContent: {
        fontSize: '1.5rem',
        textAlign: "center",
        [theme.breakpoints.down("md")]: {
            fontSize: '1.2rem',
        },
    },
    catCardActions: {
        display: "flex",
        justifyContent: "center",
        height: "60px",
    },
    selectQuizBtn: {
        alignSelf: "flex-end",
        width: "300px",
        textAlign: "center",
        fontWeight: 'bold',
        backgroundColor: "#0b134d",
        color: "white",
        padding: theme.spacing(1),
        "&:hover": {
            boxShadow: "5px 5px 7px #555",
            backgroundColor: "#0b134d",
        },
    },
    deselectQuizBtn: {
        alignSelf: "flex-end",
        width: "300px",
        textAlign: "center",
        fontWeight: 'bold',
        backgroundColor: "gray",
        color: "white",
        padding: theme.spacing(1),
        "&:hover": {
            boxShadow: "5px 5px 7px #555",
            backgroundColor: "gray",
        },
    },
}))



interface Props {
    setID: (id: number | null) => void
}

const SelectCategory: React.FC<Props> =  ({setID}) => {
    const classes = useStyles()


    const [idNum, setIdNum] = useState<number | null>(null)
    const categorylist = [
        {
            name: "Science and Nature",
            catnum: 17,
        },
        {
            name: "Computer Science",
            catnum: 18,
        },       
        {
            name: "Mathematics",
            catnum: 19,
        },
        {
            name: "Science: Gadgets",
            catnum: 30,
        }
    ]


    const addID = (id: number) => {
        setIdNum(id)
        setID(id)
    }

    const removeID = () => {
        setIdNum(null)
        setID(null)
    }

    return (
        <Container className={classes.root} fixed>
            <Typography variant="h5" component="h1" className={classes.mainhead}>Select A Category:</Typography>
            <Grid 
                container 
                direction="row"
                justify="center"
                spacing={1}
                alignItems="center"
                alignContent="center">
            {
                categorylist.map(catItem => {
                    if (idNum !== catItem.catnum){
                        return(
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Card className={classes.catCard}>
                                    <CardMedia
                                        image="/static/images/cards/paella.jpg"
                                        title="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography variant="body1" color="textSecondary" component="h1" className={classes.catCardContent}>
                                            {catItem.name}
                                        </Typography>
                                    </CardContent>
                                    <CardActions className={classes.catCardActions}>
                                        <Button onClick={() => (
                                            addID(catItem.catnum)
                                            )} className={classes.selectQuizBtn}>Select Quiz</Button>
                                    </CardActions>
                                </Card>
                            </Grid>  
                        )
                    }else{
                        return (
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                            <Card className={classes.catCard}>
                                <CardMedia
                                    image="/static/images/cards/paella.jpg"
                                    title="Paella dish"
                                />
                                <CardContent>
                                    <Typography variant="body1" color="textSecondary" component="h1" className={classes.catCardContent}>
                                        {catItem.name}
                                    </Typography>
                                </CardContent>
                                <CardActions className={classes.catCardActions}>
                                    <Button onClick={() => (
                                        removeID()
                                        )} className={classes.deselectQuizBtn}>Deselect Quiz</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                            )
                    }

                })
            }
            </Grid>
        </Container>
    )
}

export default SelectCategory

