import {Component, OnInit, Input, Output, EventEmitter } from "angular2/core";
import {Dragula, DragulaService} from "ng2-dragula/ng2-dragula";

@Component({
    selector: "editable-item-list",
    templateUrl: "templates/editable-item-form.component.html",
    directives: [Dragula],
    providers: [DragulaService]
})

export class EditableItemForm implements OnInit {
    @Input() listLabel:string;
    @Input() placeholder:string;
    @Input() itemList:Object[];
    editing:boolean[] = [];
    currItem:string;

    @Output() onAdded = new EventEmitter<string>();
    @Output() onRemoved = new EventEmitter<any>();
    @Output() onSaved = new EventEmitter<Object>();

    ngOnInit() {
        for (let i in this.itemList) {
            this.editing.push(false);
        }
    }

    addItem(value:string) {
        if (!this.isEmptyString(value)) {
            this.onAdded.emit(value);
            this.currItem = "";
            this.editing.push(false);
        }
    }

    removeItem(index:number) {
        this.onRemoved.emit(index);
        this.editing.splice(index, 1);
    }

    /* Editing Ingredients and Steps */
    editItem(index:number) {
        this.editing[index] = true;
    }

    saveEdit(index:number, value:string) {
        this.onSaved.emit({"index": index, "value": value});
        this.cancelEdit(index);
    }

    cancelEdit(index:number) {
        this.editing[index] = false;
    }

    /* Helper Functions */
    isEditing(index:number) {
        return this.editing[index];
    }

    isEmptyString(str:string) {
        return str == "" || str == null;
    }

    isValidInput(str:string) {
        if (!this.isEmptyString(str)) {
            return str.length > 10
        }
        return false
    }
}
