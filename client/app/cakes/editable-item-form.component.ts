import {Component, Input, Output, EventEmitter} from "angular2/core";

@Component({
    selector: "editable-item-list",
    template: `
            <form class="form-group editable-item-list">
                <label>{{listLabel}}</label><br>
                <!-- Add Item -->
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="(optional)"
                           [(ngModel)]="currItem">
                    <span class="input-group-btn">
                        <button type="submit" class="btn btn-primary"
                                [class.disabled]="isEmptyString(currItem)"
                                (click)="addItem(currItem)">
                            Add
                        </button>
                    </span>
                </div>
                <!-- Item List -->
                <ul *ngIf="itemList.length>0" class="list-group editable-item-list">
                    <li *ngFor="#item of itemList; #idx = index" class="list-group-item">
                        <div>
                            <!-- Item number -->
                            <div class="number-label"><span>{{idx+1}}</span></div>
                            <!-- Item name -->
                            <div class="list-group-item-name" [class.edit-item]="isEditing(idx)">
                                <span [class.hidden]="isEditing(idx)">
                                    {{item}}
                                </span>
                                <input #editValue type="text" class="form-control"
                                       [class.hidden]="!isEditing(idx)"
                                       [value]="item" autofocus>
                            </div>
                            <!-- Item buttons -->
                            <div class="edit-remove" [class.hidden]="isEditing(idx)">
                                <button type="button" class="btn edit-button"
                                        [class.hidden]="isEditing(idx)"
                                        (click)="editItem(idx)">
                                    <span class="glyphicon glyphicon-pencil"></span>
                                </button>
                                <button type="button" class="btn remove-button"
                                        [class.hidden]="isEditing(idx)"
                                        (click)="removeItem(idx)">
                                    <span class="glyphicon glyphicon-minus"></span>
                                </button>
                            </div>
                            <div class="save-cancel" [class.hidden]="!isEditing(idx)">
                                <button type="submit" class="btn btn-success save-button"
                                        (click)="saveEdit(idx, editValue.value)">
                                    <span class="glyphicon glyphicon-check"></span></button>
                                <button type="button" class="btn btn-danger cancel-button"
                                        (click)="cancelEdit(idx)">
                                    <span class="glyphicon glyphicon-remove"></span></button>
                            </div>
                        </div>
                    </li>
                </ul>
            </form>`
})

export class EditableItemForm {
    @Input() listLabel:string;
    @Input() itemList:string[];
    editing:boolean[] = [];
    currItem:string;

    @Output() onAdded = new EventEmitter<string>();
    @Output() onRemoved = new EventEmitter<any>();
    @Output() onSaved = new EventEmitter<Object>();

    addItem(value:string) {
        if (!this.isEmptyString(value)) {
            this.onAdded.emit(value);
            this.currItem = "";
            this.editing.push(false);
            console.log(this.editing);
        }
    }

    removeItem(index:number) {
        console.log(index);
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
}
