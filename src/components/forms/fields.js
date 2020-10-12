export default function fields () {
	return [
		{
			type: 'text',
			name: 'name',
			label: 'Name',
			placeholder: 'Enter contact name'
		},
		{
			type: 'tel',
			name: 'number',
			label: 'Mobile',
			placeholder: 'Enter mobile number'
		},
		{
			type: 'email',
			name: 'email',
			label: 'Email Address',
			placeholder: 'Enter email'
		},
		{
			type: 'text',
			name: 'occupation',
			label: 'Occupation',
			placeholder: 'Enter occupation'
		},
		{
			type: 'text',
			name: 'organization',
			label: 'Organization',
			placeholder: 'Enter company name'
		},
		{
			type: 'text',
			name: 'department',
			label: 'Department',
			placeholder: 'Company department'
		},
		{
			type: 'text',
			name: 'position',
			label: 'Position',
			placeholder: 'Position'
		},
		{
			type: 'url',
			name: 'website',
			label: 'Website',
			placeholder: 'Enter url'
		},
		{
			type: 'date',
			name: 'anniversary',
			label: 'Anniversary',
			placeholder: 'Anniversary / Birthday'
		},
	]
}
