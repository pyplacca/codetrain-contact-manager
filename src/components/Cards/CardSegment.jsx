import React from 'react'
import ContactCard from "./ContactCard"
// import { ContactCard } from "."


export default function CardSegment ({title, collection}) {
	return (
		<div
			id={title}
			className="card-segment"
		>
			<h3>{title}</h3>
			{
				collection.map(
					contact =>
						<ContactCard
							info={contact}
							key={contact.id}
						/>
				)
			}
		</div>
	)
}
