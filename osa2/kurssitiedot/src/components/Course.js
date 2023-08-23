const Header = ({ courseName }) => <h1>{courseName}</h1>

const Part = ({ partName, exercises }) => <p>{partName} {exercises}</p> 

const Content = ({ parts }) => parts.map(part =>
    <Part key={part.id} partName={part.name} exercises={part.exercises} />
)

const Course = ({ course }) => (
    <div>
        <Header courseName={course.name}/>
        <Content parts={course.parts} />
    </div>
)

export default Course