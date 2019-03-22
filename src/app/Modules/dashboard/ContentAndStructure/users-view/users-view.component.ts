import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/Shared/Services/User/user.service';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/Shared/Model/UserModel/user-model';
import { jqxButtonComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';
import { jqxDropDownButtonComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownbutton';
import { jqxDockingLayoutComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdockinglayout';
import { jqxListBoxComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxlistbox';
import { jqxGridComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';

@Component({
    selector: 'app-users-view',
    templateUrl: './users-view.component.html',
    styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent implements OnInit {
 
    constructor(private userService: UserService) { }
    users: any;

    ngOnInit() {

        this.userService.getUsers().subscribe((result: any) => {
            debugger;
            this.users = result;
            // result.forEach(element =>
            //    {
            //     this.users.
            // });

        });
    }

    // public lineItemColumns: any[] = [
    //     { text: 'Code', datafield: 'Code' },
    //     { text: 'Description', datafield: 'Description' },
    //     { text: 'Quantity', datafield: 'Quantity' }
    // ];
    // public lineItemsSource: any = {
    //     datatype: 'array',
    //     localdata: [
    //         { "Code": "Codeeeee", "Description": "Descccccc", "Quantity": "Quantityyyyy" }
    //     ],
    //     datafields: [
    //         { name: 'Code', type: 'string' },
    //         { name: 'Description', type: 'string' },
    //         { name: 'Quantity', type: 'float' }
    //     ]
    // };

    public lineItemColumns: any[] = [
        { text: 'userName', datafield: 'userName' },
        { text: 'FirstName', datafield: 'FirstName' }, 
    ];

    public lineItemsSource: any = {
        datatype: 'array',
        localdata: [
            { "Code": "userName", "Description": "Descccccc", "Quantity": "Quantityyyyy" }
        ],
        datafields: [
            { name: 'userName', type: 'string' },
            { name: 'FirstName', type: 'string' }, 
        ]
    };

    public lineItemsDataAdapter: any = new jqx.dataAdapter(this.lineItemsSource);
    @ViewChild('lineItemsGridReference')
    public lineItemsGridRef: jqxGridComponent;

    userWindow() {
        return {
            type: 'floatGroup',
            width: 500,
            height: 300,
            position: { x: 500, y: 150 },
            items: [{
                type: 'layoutPanel',
                title: 'Detail Item Assignments',
                contentContainer: 'DetailItemAssignmentsPanel',
                initContent: () => {
                    jqwidgets.createInstance('#lineitems-grid-container', 'jqxGrid', {
                        width: '100%',
                        height: '50%',
                        source: this.lineItemsDataAdapter,
                        columns: this.lineItemColumns,
                        sortable: true,
                        altrows: true,
                        editable: false
                    });
                    var variabled = jqwidgets.createInstance('#lineitems-grid-container2', 'jqxButton', {
                        // theme: this.theme,
                        width: '10%',
                        height: '10%',
                        value: 'Click me'
                    });
                    variabled.addEventHandler('click', event => {
                        alert();
                    });
                }
            }]
        };
    }

}

