import React from 'react'

const Course = (props) => props.course.map(course =>
	<div key={course.id}>
		<Header course={course}/>
		<Content course={course}/>
		<Total course={course}/>
    </div>
)

const Header = (props) => <h1>{props.course.name}</h1>

const Total = ({course}) => {
	const exercises = course.parts.map(part => part.exercises)
	const total = exercises.reduce((i,j) => i + j, 0)
	return <p>Yhteensä {total} tehtävää</p>
}

const Content = ({course}) => course.parts.map(part =>
		<p key={part.id}>{part.name} {part.exercises}</p>
	)
    
    export default Course
