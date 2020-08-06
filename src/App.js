import React from 'react';
import AddButton from './components/add-button.jsx'
import ContentCategory from './components/content-category.jsx'
import ContentDisplay from './components/content-display.jsx'
import ContactCard from './components/cards/contact-card.jsx'
import ContactForm from './components/forms/contact-form.jsx'
import GroupCard from './components/cards/group-card.jsx'
import GroupForm from './components/forms/group-form.jsx'
import './App.css';


const contacts = [
	{name: 'Contact 1', number: 1234567890, group: 'family'},
	{name: 'Contact 2', number: 1234567891, group: 'friends'},
	{name: 'Contact 3', number: 1234567892, group: 'family'},
	{name: 'Contact 4', number: 1234567893, group: 'family'},
	{name: 'Contact 5', number: 1234567894, group: 'friends'},
	{name: 'Contact 6', number: 1234567895, group: 'family'},
	{name: 'Contact 7', number: 1234567896, group: 'friends'},
]


class App extends React.Component {

	openContactForm () {
		document.querySelector('.form-modal#contact-form')
		.classList
		.toggle('hidden')
	}

	openGroupForm () {
		document.querySelector('.form-modal#group-form')
		.classList
		.toggle('hidden')
	}

	render () {
		const groups = contacts.reduce((output, obj, i) => {
			const {group} = obj
			if (group) {
				output[group] = [...(output[group] || []), obj]
			}
			return output
		}, {})

		return (
			<div className="App">
				{/* Contacts Category */}
				<ContentCategory id="contacts">
					<div className="head">
						<div>
							<h2>Contacts</h2>
							<p>{contacts.length + ' contacts'}</p>
						</div>
						<AddButton clickCallback={this.openContactForm} />
					</div>
					<ContentDisplay>
						{
							contacts.map(
								(person, i) => <ContactCard info={person} key={i}/>
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
								<GroupCard name={name} list={groups[name]} key={i}/>
							)
						}
					</ContentDisplay>
					<AddButton clickCallback={this.openGroupForm} />
				</ContentCategory>

				{/* Forms */}
				<ContactForm />
				<GroupForm contact_list={contacts}/>
			</div>
		);
	}
}

export default App;
