import React from "react";
import AddButton from "./components/add-button.jsx"
import ContentCategory from "./components/content-category.jsx"
import ContentDisplay from "./components/content-display.jsx"
import ContactCard from "./components/cards/contact-card.jsx"
import ContactForm from "./components/forms/contact-form.jsx"
import GroupCard from "./components/cards/group-card.jsx"
import GroupForm from "./components/forms/group-form.jsx"
import "./App.css";


class App extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			// An id helps keep track of each contact
			id: 1,
			/*
			Each contact entry is an object with integer(s), string(s) and/or array(s)
			A contact's group entry must be a Set in order to accomodate the
				association of a contact to multiple groups without duplication.
			*/
			contacts: {},
			// for previewing and editing purposese
			modify: {
				contact: {
					mode: 'add',
					entry: {}
				},
				group: {
					mode: 'add',
					entry: undefined
				},
			},
			view: {
				contactForm: 'closed',
				groupForm: 'closed'
			}
		}

		// Form refs.
		this.cform = React.createRef()
		this.gform = React.createRef()

		// Form toggling methods.
		this.toggleContactForm = this.toggleContactForm.bind(this)
		this.toggleGroupForm = this.toggleGroupForm.bind(this)

		// Contact modification (create, preview, edit, delete) methods.
		this.editContact = this.editContact.bind(this)
		this.deleteContact = this.deleteContact.bind(this)
		this.newContact = this.newContact.bind(this)
		this.modifyContact = this.modifyContact.bind(this)
		this.previewContact = this.previewContact.bind(this)

		/*
		Group modification (create, edit) methods.
		A group is automatically deleted if no contact(s) exist(s) inthat group
			since all groups are created from existing contacts hence,
			making each group solely dependent on the contacts.
		*/
		this.modifyGroup = this.modifyGroup.bind(this)
		this.newGroup = this.newGroup.bind(this)
		this.previewGroup = this.previewGroup.bind(this)
	}

	toggleContactForm (view) {
		// Hide or show contact form
		this.setState({
			view: {
				...this.state.view,
				contactForm: view
			}
		})
	}

	toggleGroupForm (view) {
		// Hide or show group form
		this.setState({
			view: {
				...this.state.view,
				groupForm: view
			}
		})
	}

	// Creates or updates a contact entry
	modifyContact (contact) {
		// If [contact] has an id, then we'll update the contact's entry else,
		// we'll create a new contact entry
		let has_id = false
		const {id} = this.state
		contact.id ? has_id = true : contact.id = id
		this.setState({
			id: !has_id ? id + 1 : id,
			contacts: {...this.state.contacts, [contact.id]: contact}
		// close contact form when done
		}, () => this.toggleContactForm('closed'))
	}

	// Adds or removes contact(s) from a group
	modifyGroup (oldgroup, new_data) {
		const [{contacts}, {name}] = [this.state, new_data]
		delete new_data['name']

		for (let id in new_data) {
			if (new_data[id]) {
				// if there's been a change to the group name,
				// replace the old name with the new
				contacts[id].group.delete(oldgroup)
				contacts[id].group.add(name)
			} else {
				// remove contact from group if it was checked out (for group editing)
				contacts[id].group.delete(name)
			}
		}
		this.setState(contacts, () => this.toggleGroupForm('closed'))
	}

	newContact () {
		// Create a new contact form by resetting states,
		this.setState({
			modify: {
				...this.state.modify,
				contact: {
					mode: 'add',
					entry: {}
				},
			},
		}, () => {
			this.cform.current.setState({
				...Object.keys(this.cform.current.state)
				.reduce((output, key) => {
					output[key] = ''
					return output
				}, {}),
				group: new Set(),
			}, () => {
				// then open the contact form for the creation of a new contact
				this.toggleContactForm('open')
			})
		})
	}

	newGroup () {
		// Create a new group form by resetting states
		this.setState({
			modify: {
				...this.state.modify,
				group: {
					mode: 'create',
					entry: undefined
				},
			},
		}, () => {
			this.gform.current.setState({
				name: '',
				...Object.keys(this.state.contacts)
				.reduce((output, id) => {
					output[id] = false
					return output
				}, {})
			}, () => {
				// then open the group form for the creation of a new group
				this.toggleGroupForm('open')
			})
		})
	}

	editContact (id) {
		// Get information of contact to be edited using the [id],...
		const entry = this.state.contacts[id]
		this.setState({
			modify: {
				...this.state.modify,
				contact: {
					mode: 'edit',
					entry
				},
			},
		}, () => {
			// pre-fill the contact form with retrieved values,...
			this.cform.current.setState({...entry}, () => {
				// then open the contact form for editing
				this.toggleContactForm('open')
			})
		})
	}

	previewGroup (name) {
		this.setState({
			modify: {
				...this.state.modify,
				group: {
					mode: 'edit',
					entry: name,
				}
			}
		}, () => {
			// grab ids of all contacts that belong to the selected group [name],
			const contactIDs = Object.values(this.state.contacts)
			.reduce((ids, contact) => {
				ids[contact.id] = contact.group.has(name)
				return ids
			}, {})
			// then preview that group and its selected contacts with the group form.
			this.gform.current.setState(
				{ name, ...contactIDs },
				() => this.toggleGroupForm('open')
			)
		})
	}

	previewContact (id) {
		// get information of contact to be previewed then,...
		const entry = this.state.contacts[id]
		this.setState({
			modify: {
				...this.state.modify,
				contact: {
					mode: 'preview',
					entry
				},
			},
		}, () => {
			// pass the information down to the contact form for previewing
			this.cform.current.setState({...entry}, () => {
				// then open the contact form
				this.toggleContactForm('open')
			})
		})
	}

	deleteContact(id) {
		const {contacts} = this.state
		delete contacts[id]
		this.setState({contacts})
	}

	render () {
		const {modify, contacts, view} = this.state
		const contacts_array = Object.values(contacts)
		const groups = contacts_array.reduce((output, person) => {
			const {group} = person
			if (group) {
				group.forEach(name =>
					output[name] = [...(output[name] || []), person]
				)
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
							<p>{contacts_array.length + " contacts"}</p>
						</div>
						<AddButton clickCallback={this.newContact} />
					</div>
					<ContentDisplay>
						{
							contacts_array.map((person, i) =>
								<ContactCard
									info={person}
									previewCallback={this.previewContact}
									editCallback={this.editContact}
									deleteCallback={this.deleteContact}
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
							// a group card is automatically deleted once there are
							// no contacts present in that group after update.
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
					<AddButton clickCallback={this.newGroup} />
				</ContentCategory>

				{/*
					Both contact and group forms are multipurpose.
					They can be used to create, edit and preview a contact / group
				*/}
				<ContactForm
					ref={this.cform}
					view={view.contactForm}
					toggleFunc={this.toggleContactForm}
					submitCallback={this.modifyContact}
					mode={modify.contact.mode}
					contact={modify.contact.entry}
				/>
				<GroupForm
					ref={this.gform}
					view={view.groupForm}
					mode={modify.group.mode}
					toggleFunc={this.toggleGroupForm}
					contacts={this.state.contacts}
					submitCallback={this.modifyGroup}
					group={modify.group.entry}
				/>
			</div>
		);
	}
}

export default App;
