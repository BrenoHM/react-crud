import React, {useState} from "react";
import TutorialDataService from "../services/tutorial.service";

export default function AddTutorial() {

    // eslint-disable-next-line
    const [id, setId] = useState(null)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // eslint-disable-next-line
    const [published, setPublished] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const saveTutorial = () => {

        var data = {
            title,
            description
        };

        TutorialDataService.create(data).then(response => {
            setId(response.data.id);
            setTitle(response.data.title);
            setDescription(response.data.description);
            setPublished(response.data.published);
            setSubmitted(true);
        }).catch(e => {
            console.log(e);
        });

    }

    const newTutorial = () => {
        setId(null);
        setTitle("");
        setDescription("");
        setPublished(false);
        setSubmitted(false);
    }

    return (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={newTutorial}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  name="description"
                />
              </div>
  
              <button onClick={saveTutorial} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
    );

}