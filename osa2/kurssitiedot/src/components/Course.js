const Header = ({ courseName }) => <h2>{courseName}</h2>

const Part = ({ partName, exercises }) => <p>{partName} {exercises}</p> 

const Content = ({ parts }) => parts.map(part =>
    <Part key={part.id} partName={part.name} exercises={part.exercises} />
)

const Total = ({ parts }) => {
    const total = parts.reduce((s,p) => s + p.exercises, 0)
    return <strong>total of {total} exercises</strong>
}

const Course = ({ course }) => (
    <div>
        <Header courseName={course.name}/>
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
)

export default Course