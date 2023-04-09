import useStyles from "./CategoryCss";
import React, { useState } from 'react'
import { TextField, Grid, Button, Avatar } from "@mui/material";
import { postData } from "../../Services/NodeService";

const Category = () => {
    const classes = useStyles()
    const [categoryName, setCategoryName] = useState("")
    const [icon, setIcon] = useState({ url: "", bytes: "" })

    const handleIcon = (e) => {
        setIcon({ url: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
    }

    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append("category", categoryName)
        formData.append("icon", icon.bytes)
        const result = await postData("admin/category", formData, true)
        alert(result.data.result)
        setCategoryName("")
        setIcon({ url: "", icon: "" })
    }

    const handleReset = () => {
        setCategoryName("")
        setIcon({ url: "", icon: "" })
    }

    return (
        <div className={classes.mainContainer}>
            <div className={classes.box} >
                <Grid container rowGap={2} columnSpacing={2} >
                    <Grid item xs={12} className={classes.headingText}>Category Interface</Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth value={categoryName} variant="outlined" label="Category Name" onChange={(e) => setCategoryName(e.target.value)} />
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth component="label" variant="contained" >
                            Upload
                            <input hidden accept="image/*" onChange={handleIcon} name="icon" multiple type="file" />
                        </Button>
                    </Grid>
                    <Grid container item xs={6} flexDirection="row" justifyContent="center"  >
                        <Avatar alt="Icon" src={icon.url} variant="rounded" sx={{
                            width: 56, height: 56
                        }} />
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={handleSubmit} >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={handleReset} >
                            Reset
                        </Button>
                    </Grid>
                </Grid>

            </div>
        </div>

    )
}

export default Category