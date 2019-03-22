import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Shared/Services/User/user.service';
import { UserModel } from 'src/app/Shared/Model/UserModel/user-model';
import { Observable } from 'rxjs';
import { jqxRibbonComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxribbon';
import { jqxButtonComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';
import { jqxDropDownButtonComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownbutton';
import { jqxDockingLayoutComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdockinglayout';
import { jqxListBoxComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxlistbox';
import { jqxGridComponent } from 'node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { UsersViewComponent } from './ContentAndStructure/users-view/users-view.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {

    users: Observable<UserModel>;
    arrlayout = [];

    reportClosed = true;


    @ViewChild('jqxRibbon') ribbon: jqxRibbonComponent;
    @ViewChild('fileItemButton') fileItemButton: jqxDropDownButtonComponent;
    @ViewChild('myDockingLayout') myDockingLayout: jqxDockingLayoutComponent;
    public lineItemColumns: any[] = [
        { text: 'Code', datafield: 'Code' },
        { text: 'Description', datafield: 'Description' },
        { text: 'Quantity', datafield: 'Quantity' }
    ];
    public lineItemsSource: any = {
        datatype: 'array',
        // localdata: this.lineItems,
        localdata: [
            { "Code": "Codeeeee", "Description": "Descccccc", "Quantity": "Quantityyyyy" }
        ],
        datafields: [
            { name: 'Code', type: 'string' },
            { name: 'Description', type: 'string' },
            { name: 'Quantity', type: 'float' }
        ]
    };

    public lineItemsDataAdapter: any = new jqx.dataAdapter(this.lineItemsSource);
    @ViewChild('lineItemsGridReference')
    public lineItemsGridRef: jqxGridComponent;

    @ViewChild('lineitems-grid-container2')
    public jButtonRef: jqxButtonComponent;

    source: any[] = [{
        label: "Peppermint Hot Chocolate",
        value: "Chocolate Beverage",
        group: "Hot Chocolate"
    }, {
        label: "Salted Caramel Hot Chocolate",
        value: "Chocolate Beverage",
        group: "Hot Chocolate"
    }, {
        label: "White Hot Chocolate",
        value: "Chocolate Beverage",
        group: "Hot Chocolate"
    }, {
        label: "Caffe Americano",
        value: "Espresso Beverage",
        group: "Espresso"
    }, {
        label: "Caffe Latte",
        value: "Espresso Beverage",
        group: "Espresso"
    }, {
        label: "Caffe Mocha",
        value: "Espresso Beverage",
        group: "Espresso"
    }, {
        label: "Cappuccino",
        value: "Espresso Beverage",
        group: "Espresso"
    }];
    
    OnUser()
    {
        alert("clikced");
    }

    constructor(private router: Router, private userService: UserService) {

        var isreloaded = localStorage.getItem('reloaded');
        if (!isreloaded) {

            localStorage.setItem('reloaded', "true");

            location.reload();
        }
        else {
            localStorage.setItem('reloaded', "");
        }

       this.arrlayout = this.generateLayout();

    }
 

    getWidth(): any {
        if (document.body.offsetWidth < 2000) {
            return '100%';
        }
        return document.body.offsetWidth;
    }

    getHeight(): any {
        if (document.body.offsetHeight < 2000) {
            return '100%';
        }
        return document.body.offsetHeight;
    }


    ngOnInit() {

        this.userService.getUsers().subscribe((r: any) => {
            this.users = r;
            this.users.forEach(element => {
                console.log(element);
            });

        });
    }

    onLogout() {
        localStorage.removeItem('TokenInfo');
        this.router.navigateByUrl('/login');
    }

    loadDynamicWindow(contentContainer, name) {
        var window = 
        {
            type: 'floatGroup',
            width: 300,
            height: 300,
            position: { x: 1000, y: 150 },
            
            items: [{
                type: 'layoutPanel',
                title: name,
               contentContainer: contentContainer, 
               initContent: () => {
                var variable = jqwidgets.createInstance('#lineitems-grid-container', 'jqxGrid', {
                    // theme: this.theme,
                    width: '30%',
                    height: '20%',
                    source: this.lineItemsSource,
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
        }
        var savelay = this.myDockingLayout.saveLayout();
        savelay[0].items.push(window);
        this.myDockingLayout.loadLayout(savelay);
    }

    loadDynamicTab(container, title) {
        alert("Load dynamic window");
        var savelay = this.myDockingLayout.saveLayout();
        var pushindex = savelay[0].items.findIndex(c => c.type == 'layoutGroup');
        //For First Tab
        if (pushindex < 0) {
            savelay[0].items.push(this.createFirstTab(container, title));
        } else {
            var succeed = this.findObjects(savelay[0].items, 'type', 'documentGroup', container, title);
            if (!succeed) {
                savelay[0].items.splice(1, 0, this.createFirstTab(container, title));
            }
        }
        this.myDockingLayout.loadLayout(savelay);
    }


    findObjects(obj, targetProp, targetValue, container, title) {
        var succeed = false;
        function getObject(theObject) {
            let result = null;
            if (theObject instanceof Array) {
                for (let i = 0; i < theObject.length; i++) {
                    getObject(theObject[i]);
                }
            }
            else {
                for (let prop in theObject) {
                    if (theObject.hasOwnProperty(prop)) {
                        console.log(prop + ': ' + theObject[prop]);
                        if (prop === targetProp) {
                            console.log('--found id');
                            if (theObject[prop] === targetValue) {
                                console.log('----found porop', prop, ', ', theObject[prop]);
                                if (!succeed) {
                                    theObject.items.push({
                                        type: 'documentPanel',
                                        title: title,
                                        contentContainer: container,
                                    });
                                    succeed = true;
                                }
                            }
                        }
                        if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                            getObject(theObject[prop]);
                        }
                    }
                }
            }
        }
        getObject(obj);
        return succeed;
    }

    createFirstTab(container, title) {
        return {
            type: 'layoutGroup',
            orientation: 'vertical',
            width: 500,
            items: [{
                type: 'documentGroup',
                height: 400,
                minHeight: 200,
                items: [{
                    type: 'documentPanel',
                    title: title,
                    contentContainer: container
                }]
            }]
        };
    }

     //To load user compnent inside dashboard
     @ViewChild(UsersViewComponent) userComponent;
     loadUserWindow() {
         alert("Load user window");
         var userwindow = this.userComponent.userWindow();
         var savelay = this.myDockingLayout.saveLayout();
         savelay[0].items.push(userwindow);
         this.myDockingLayout.loadLayout(savelay);
     }
 
     loadReport() {
         this.reportClosed = false;
         var window = {
             type: 'floatGroup',
             width: 300,
             height: 300,
             position: { x: 500, y: 150 },
             items: [{
                 type: 'layoutPanel',
                 title: 'Report',
                 contentContainer: 'report'
             }]
         };
         var savelay = this.myDockingLayout.saveLayout();
         savelay[0].items.push(window);
         this.myDockingLayout.loadLayout(savelay);
     }
 

    generateLayout() {
        var layout = [
            {
                type: 'layoutGroup',
                orientation: 'horizontal',
            
                items: [
                    {
                        type: 'layoutPanel',
                        alignment: 'left',
                        width: 100,
                        unpinnedWidth: 200,
                        items: []
                    }
                ]
               
            }
        ];
        return layout;
    }

    floatGroupClosed(event) {
        if (event && event.args && event.args.floatGroup && event.args.floatGroup.items && event.args.floatGroup.items.length >= 0) {
            var reportIndex = event.args.floatGroup.items.findIndex(c => c.title == 'Report');
            if (reportIndex >= 0) {
                this.reportClosed = true;
            }
        }
    }
}
