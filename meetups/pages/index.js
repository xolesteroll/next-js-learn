import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'first meetup',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-nGYKE6CGzV7KCus64xAPceiN3r-dZ-sNMngMMGGu&s',
        address: 'some ADress 1',
        description: 'Some description 1'
    },
    {
        id: 'm2',
        title: 'second meetup',
        image: 'https://media.istockphoto.com/photos/image-of-open-antique-book-on-wooden-table-with-glitter-overlay-picture-id1354441996?b=1&k=20&m=1354441996&s=170667a&w=0&h=O4JDagXhIh1N13PNN6G4_L5KB5QPZryin7FOrZnzYvc=',
        address: 'some ADress 2',
        description: 'Some description 2'
    },
    {
        id: 'm3',
        title: 'third meetup',
        image: 'https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=480&h=320',
        address: 'some ADress 3',
        description: 'Some description 3'
    },
]

function HomePage() {
    return (
        <MeetupList meetups={DUMMY_MEETUPS}/>
    )
}

export default HomePage
