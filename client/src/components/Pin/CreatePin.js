import React, { useState, useContext } from "react";
import axios from 'axios'
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhotoTwoTone";
import LandscapeIcon from "@material-ui/icons/LandscapeOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/SaveTwoTone";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";

import Context from '../../context'
import { useClient } from '../../client'
import { CREATE_PIN_MUTATION } from '../../graphql/mutations'

const CreatePin = ({ classes }) => {
  const mombileSize = useMediaQuery('(max-width: 650px)')
  const client = useClient()
  const { state, dispatch } = useContext(Context)
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [preview, setPreview] = useState(null)
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleDeletedraft = () => {
    setTitle('')
    setImage('')
    setContent('')
    dispatch({ type: 'DELETE_DRAFT' })
  }

  const handleImageUpload = async () => {
    try {
      const data = new FormData()
      data.append('file', image)
      data.append('cloud_name', process.env.REACT_APP_CLOUD_NAME)
      data.append('upload_preset', 'geopins')
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, data)
      return response.data.secure_url
    } catch (err) {
      console.error('Error uploading image', err)
    }
  }

  const handleOnImageChange = event => {
    setImage(event.target.files[0])
    try {
      setPreview(URL.createObjectURL(event.target.files[0]))
    } catch (err) { }
  }

  const handleSubmit = async event => {

    try {
      event.preventDefault()
      setSubmitting(true)
      const url = await handleImageUpload()
      const { latitude, longitude } = state.draft
      const variables = { title, image: url, content, latitude, longitude }
      await client.request(CREATE_PIN_MUTATION, variables)
      handleDeletedraft()
    } catch (err) {
      console.error('Error creating pin', err)
    }

  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Typography
        className={classes.alignCenter}
        component='h2'
        variant='h4'
        color='secondary'
      >
        <LandscapeIcon className={classes.iconLarge} /> Pin Location
      </Typography>

      <TextField fullWidth
        name='title'
        label='title'
        placeholder='Insert pin title'
        onChange={e => setTitle(e.target.value)}
      />

      <div style={{ display: 'flex' }}>
        <input
          accept='image/*'
          id='image'
          type='file'
          className={classes.input}
          onChange={handleOnImageChange}
        />
        <label htmlFor="image">
          <Button
            style={{ color: image && 'green' }}
            component='span'
            size='small'
            className={classes.button}
          >
            <AddAPhotoIcon />
          </Button>
        </label>
        {preview && <img style={{ maxWidth: '80px', maxHeight: '60px', marginTop: '10px' }} src={preview} alt="preview" />}
      </div>
      <div className={classes.contentField}>
        <TextField
          name='content'
          label='Content'
          multiline
          rows={mombileSize ? '3' : '6'}
          margin='normal'
          fullWidth
          variant='outlined'
          onChange={e => setContent(e.target.value)}
        />
      </div>
      <div>
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={handleDeletedraft}
        >
          <ClearIcon className={classes.leftIcon} />
          Discard
        </Button>
        <Button
          className={classes.button}
          variant='contained'
          color='secondary'
          type='submit'
          onClick={handleSubmit}
          disabled={!title.trim() || !content.trim() || !image || submitting}
        >
          Save
          <SaveIcon className={classes.rightIcon} />
        </Button>
      </div>
    </form>
  )
};

const styles = theme => ({
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: theme.spacing.unit
  },
  contentField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "95%"
  },
  input: {
    display: "none"
  },
  alignCenter: {
    display: "flex",
    alignItems: "center"
  },
  iconLarge: {
    fontSize: 40,
    marginRight: theme.spacing.unit
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginLeft: 0
  }
});

export default withStyles(styles)(CreatePin);
