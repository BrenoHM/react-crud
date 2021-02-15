import React, {useState, useEffect} from "react";
import TutorialDataService from "../services/tutorial.service";
import {useParams, useHistory} from "react-router-dom";

export default function Tutorial() {
    const { id } = useParams();
    const history = useHistory();

    const[currentTutorial, setCurrentTutorial] = useState({
        id: null,
        title: "",
        description: "",
        published: false
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        getTutorial(id);
    }, [id]);

    function getTutorial(id) {
        TutorialDataService.get(id)
          .then(response => {
            setCurrentTutorial(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }

    function onChangeTitle(e){
        setCurrentTutorial({
            ...currentTutorial,
            title: e.target.value
        });
    }

    function onChangeDescription(e) {
        setCurrentTutorial({
            ...currentTutorial,
            description: e.target.value
        });
    }

    function deleteTutorial() {
        TutorialDataService.delete(currentTutorial.id).then(response => {
          history.push('/tutorials');
        })
        .catch(e => {
          console.log(e);
        });
    }

    function updateTutorial() {
        TutorialDataService.update(
          currentTutorial.id,
          currentTutorial
        ).then(response => {
            setMessage("The tutorial was updated successfully!");
          }).catch(e => {
            console.log(e);
        });
    }

    function updatePublished(status) {
      var data = {
        id: currentTutorial.id,
        title: currentTutorial.title,
        description: currentTutorial.description,
        published: status
      };
  
      TutorialDataService.update(currentTutorial.id, data).then(response => {
          setCurrentTutorial({
              ...currentTutorial,
              published: status
          });
      }).catch(e => {
          console.log(e);
      });
    }

    return (
        <div>
        {currentTutorial ? (
          <div className="edit-form">
            <h4>Tutorial</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTutorial.title}
                  onChange={onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTutorial.description}
                  onChange={onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentTutorial.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={deleteTutorial}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={updateTutorial}
            >
              Update
            </button>
            <p>{message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    )
}