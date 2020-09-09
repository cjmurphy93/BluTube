import React from 'react';

class CreateVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.video;

        this.handleFile = this.handleFile.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    // componentDidMount() {
    //     document.title = "Create a video";
    // }

    handleInput(field) {
        return e => this.setState({[field]: e.currentTarget.value});
    };

    handleFile(e) {
        const file = e.currentTarget.files[0];

        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onloadend = () => {
                this.setState({
                    title: file.name,
                    videoFile: file,
                    videoUrl: fileReader.result
                })
            };
        } else {
            this.setState({ videoFile: null, videoUrl: ''})
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('video[title]', this.state.title);
        formData.append('video[description]', this.state.description);
        formData.append('video[creator_id]', this.props.currentUser.id);
        if (this.state.videoFile) {
            formData.append('video[video_file]', this.state.videoFile);
        };
        this.props.createVideo(formData).then(video => {
            this.props.history.push(`/videos/${video.video.id}`);
            this.props.closeModal();
        })
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text"
                    value={this.state.title}
                    onChange={this.handleInput('title')}
                    placeholder="Title"/>
                    <br/>
                    <textarea value={this.state.description}
                    onChange={this.handleInput('description')}
                    placeholder="description"></textarea>
                    <br/>
                    {/* <input type="file"
                    onChange={this.handleFile}
                    accept='.mp4'/> */}
                    <br/>
                    <button type="submit">submit</button>
                </form>
            </div>
        )
    }
}

export default CreateVideo;