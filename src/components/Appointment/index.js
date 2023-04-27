import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function saveOperation(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));

  }

  function deleteOperation(name) {
    transition(DELETING,true);
    const interview = null;
    props.deleteInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  function editOperation(name, interviewer) {
    transition(EDIT);
    //props.bookInterview(props.id, interview);
    //  transition(SHOW);
  }

  return (
    <article className="appointment" data-testid="appointment" >
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(DELETE)}
          onEdit={editOperation}
        />
      }
      {mode === SAVING && <Status message={'Saving'} />}
      {mode === DELETE && <Confirm message={'Are you sure you want to delete the appointment?'} onConfirm={deleteOperation} onCancel={back} />}
      {mode === DELETING && <Status message={'Deleting'} />}
      {mode === ERROR_DELETE && <Error message={'Could not delete the appointment'} onClose={back} />}
      {mode === ERROR_SAVE && <Error message={'Could not save the appointment'} onClose={back} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={saveOperation} />}
      {mode === EDIT && <Form interviewers={props.interviewers} student={props.interview.student} onCancel={back} onSave={saveOperation} />}
    </article>
  );
}