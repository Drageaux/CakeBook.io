import {Component, Input, Output, EventEmitter} from "angular2/core";

@Component({
    selector: "editable-item-list",
    template: `
            <form class="form-group">
                <label>{{listLabel}}</label><br>
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
                                       [value]="item.value" autofocus>
                            </div>
                            <!-- Item buttons -->
                            <div class="edit-remove" [class.hidden]="isEditing(idx)">
                                <button type="button" class="btn edit-button"
                                        [class.hidden]="isEditing(idx)"
                                        (click)="editOptionalItem('ingr', idx)">
                                    <span class="glyphicon glyphicon-pencil"></span>
                                </button>
                                <button type="button" class="btn remove-button"
                                        [class.hidden]="isEditing(idx)"
                                        (click)="removeOptionalItem('ingr', idx)">
                                    <span class="glyphicon glyphicon-minus"></span>
                                </button>
                            </div>
                            <div class="save-cancel" [class.hidden]="!isEditing(idx)">
                                <button type="button" class="btn btn-success save-button"
                                        (click)="saveEdit('ingr', idx, editValue.value)">
                                    <span class="glyphicon glyphicon-check"></span></button>
                                <button type="button" class="btn btn-danger cancel-button"
                                        (click)="cancelEdit('ingr', idx)">
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
    editing:string[];
    currItem:string;

    @Output() onAdded = new EventEmitter<any>();

    addItem(value:string) {
        this.onAdded.emit(value);
        this.currItem = "";
    }

    isEditing(index:number) {
        return this.itemList[index]["editing"];
    }

    isEmptyString(str:string) {
        return str == "" || str == null;
    }
}
