import React from "react";
import AddButton from "./components/add-button.jsx"
import ContentCategory from "./components/content-category.jsx"
import ContentDisplay from "./components/content-display.jsx"
import ContactCard from "./components/cards/contact-card.jsx"
import ContactForm from "./components/forms/contact-form.jsx"
import GroupCard from "./components/cards/group-card.jsx"
import GroupForm from "./components/forms/group-form.jsx"
import "./App.css";


// contact and group names are case-sensitive
const contacts = {
	0: {name: "", number: 1234567890, group: ["Family"], id: 0},
	1: {name: "Contact 2", number: 1234567891, group: ["Friends"], id: 1},
	2: {name: "Contact 3", number: 1234567892, group: ["Family"], id: 2},
	3: {name: "Contact 4", number: 1234567893, group: ["Family"], id: 3},
	4: {name: "Contact 5", number: 1234567894, group: ["Friends"], id: 4},
	5: {name: "Contact 6", number: 1234567895, group: ["Family"], id: 5},
	6: {name: "Contact 7", number: 1234567896, group: ["Friends"], id: 6},
}

const preview = { contact: contacts[1], group: "colleagues" }

const contacts_array = Object.values(contacts)
const groups = contacts_array.reduce((output, obj, i) => {
	const {group} = obj
	if (group) {
		group.forEach(name =>
			output[name] = [...(output[name] || []), obj]
		)
	}
	return output
}, {})

console.log(groups)

class App extends React.Component {

	openContactForm () {
		document.querySelector(".form-modal#contact-form")
		.classList
		.toggle("hidden")
	}

	openGroupForm () {
		document.querySelector(".form-modal#group-form")
		.classList
		.toggle("hidden")
	}

	createContact (contact) {}

	createGroup (group) {}

	editContact (id) {}

	previewGroup ({target}) {
		const group_name = target.getAttribute("id")
		if (target.classList.contains("card")) {
			console.log(group_name, groups[group_name])
		}
	}

	previewContact ({target}) {
		const contact_id = target.getAttribute("id")
		if (target.classList.contains("card")) {
			console.log(contacts[contact_id])
		}
	}

	render () {
		return (
			<div className="App">
				{/* Contacts Category */}
				<ContentCategory id="contacts">
					<div className="head">
						<div>
							<h2>Contacts</h2>
							<p>{contacts_array.length + " contacts"}</p>
						</div>
						<AddButton clickCallback={this.openContactForm} />
					</div>
					<ContentDisplay>
						{
							contacts_array.map((person, i) =>
								<ContactCard
									info={person}
									clickCallback={this.previewContact}
									key={i}
								/>
							)
						}
					</ContentDisplay>
				</ContentCategory>

				{/* Groups Category */}
				<ContentCategory id="groups">
					<div className="head">
						<h2>Groups</h2>
					</div>
					<ContentDisplay>
						{
							Object.keys(groups).sort().map((name, i) =>
								<GroupCard
									name={name}
									list={groups[name]}
									key={i}
									clickCallback={this.previewGroup}
								/>
							)
						}
					</ContentDisplay>
					<AddButton clickCallback={this.openGroupForm} />
				</ContentCategory>

				{/* Forms */}
				<ContactForm />
				<GroupForm contacts={contacts} />
			</div>
		);
	}
}

export default App;
