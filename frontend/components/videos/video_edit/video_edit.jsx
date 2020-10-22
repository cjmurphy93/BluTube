import React from 'react';

class VideoEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.video,

        

        this.handleDelete = this.handleDelete.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {

        this.props.fetchVideo(this.props.match.params.videoId);
    }

    handleDelete(e) {
      e.preventDefault();
      const {video, currentUser} = this.props;
      if (currentUser.id === video.creator.id) {
      this.props.destroyVideo(video).then(() => {
        this.props.history.push(`/`);
      });
    }
    }

    handleInput(field) {
        return e => this.setState({[field]: e.currentTarget.value});
    };

    handleSubmit(e) {
        e.preventDefault();
        this.props.updateVideo(this.state).then(() => {
            return this.props.history.push(`/videos/${this.props.video.id}`)
        })
    }

    render() {

        if ((this.props.currentUser.id !== this.props.video.creator.id) || !this.props.video) return null;

        const { title, description, videoUrl, fileName } = this.state;

        const {waiting} = this.state;

        const deleteBtn = ((this.props.currentUser) && (this.props.currentUser.id === this.props.video.creator.id)) ? (
          <button onClick={this.handleDelete}>DELETE</button>
        ) : (
          <></>
        );

        const publishButton = (title && !waiting) ? (
    <button className='publish' onClick={this.handleSubmit}>SAVE</button>
    ) : ( (waiting) ? (
     <button className='publish disabled waiting-publish' >SAVE</button>) : (
    <button className='publish disabled' >SAVE</button>   
     ));

         const titleError = (title.length) ? 'title' : 'title-error';

        return (
            <div className="edit-video">
                            <div className='upload-top'>
                <h2>Video details</h2>
                <div className="edit-buttons">
                    {publishButton}
                    {deleteBtn}
                </div>
            </div>

            <section className='upload-content-2'>
                <section className='upload-details'>
                    <h2>Details</h2>
                    <div className={`textarea-container ${titleError}`}>
                    <div className='outer-textarea'>
                    <p className='title-textarea-header'>Title (required)</p>
                    <textarea className="upload-textarea" cols="30" rows="10" placeholder='Add a title that describes your video' onChange={this.handleInput('title')} value={title}></textarea>
                    </div>
                    </div>

                    <div className='textarea-container description'>
                        <div className='outer-textarea'>
                            <p className='description-textarea-header'>Description</p>
                            <textarea className='upload-textarea' cols="30" rows="10" placeholder='Tell viewers about your video' onChange={this.handleInput('description')} value={description}></textarea>    
                        </div>
                    </div>
                </section>
                <section className='upload-mini-player'>
                    <div className='description-mini-player-container'>
                        <video src={videoUrl} controls></video>
                    </div>
                    <div className='video-info'>
                        <p>Filename</p>
                        <h4>{fileName}</h4>
                    </div>
                </section>
            </section>
           

            </div>
        )

    }

}

export default VideoEdit;