
class YouTubeLink {
    constructor(link = null) {
        this.link = link;
    }

    getId() {
        this.id = this.link.split('v=').pop();
        return this.id ;
    }
    getVideoLink() {
        console.log(this.link.replace( /.+\?v=/, "https://www.youtube.com/embed/" ))
        return this.link.replace( /.+\?v=/, "https://www.youtube.com/embed/" )
    }
}

export default YouTubeLink;