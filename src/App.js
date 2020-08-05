import React from 'react';
import ContentCategory from './resources/components/content-category.jsx'
import ContentDisplay from './resources/components/content-display.jsx'
import ContactCard from './resources/components/contact-card.jsx'
import GroupCard from './resources/components/group-card.jsx'
import AddButton from './resources/components/add-button.jsx'
import ContactForm from './resources/components/contact-form.jsx'
import GroupForm from './resources/components/group-form.jsx'
import './App.css';


const contacts = [
	{name: 'Contact 1', number: 1234567890},
	{name: 'Contact 2', number: 1234567891},
	{name: 'Contact 3', number: 1234567892},
	{name: 'Contact 4', number: 1234567893},
	{name: 'Contact 5', number: 1234567894},
	{name: 'Contact 6', number: 1234567895},
	{name: 'Contact 7', number: 1234567896},
]

const groups = [
	{name: 'Family', count: 4},
	{name: 'Friends', count: 3},
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
		return (
			<div className="App">
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

				<ContentCategory id="groups">
					<div className="head">
						<h2>Groups</h2>
					</div>
					{
						groups.map(
							(group, i) => <GroupCard {...group} key={i}/>
						)
					}
					<AddButton clickCallback={this.openGroupForm} />
				</ContentCategory>
				<ContactForm />
				<GroupForm contact_list={contacts}/>
			</div>
		);
	}
}

export default App;
