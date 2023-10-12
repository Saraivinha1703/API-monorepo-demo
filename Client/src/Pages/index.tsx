import { Read } from "./Read"
import { Delete } from "./Delete.tsx"
import { Create } from "./Create.tsx"
import { Update } from "./Update.tsx"

export function MainPage() {
    return (
        <div>
            <p>Hello World!</p>
            <Read />
            <Delete />
            <Create />
            <Update />
        </div>
    )
}