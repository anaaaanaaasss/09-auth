import css from "./NotesLayout.module.css"
import SidebarNotes from "@/components/SidebarNotes/SidebarNotes"

interface NotesLayoutProps {
	children: React.ReactNode
}

const NotesLayout = ({ children }: NotesLayoutProps) => {
	return (
		<section className={css.container}>
			<aside className={css.sidebar}>
				<SidebarNotes />
			</aside>
			<div className={css.notesWrapper}>{children}</div>
		</section>
	)
}

export default NotesLayout