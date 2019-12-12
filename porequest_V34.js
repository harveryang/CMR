function PORequestForm() {
	//alert($().jquery);
    this.formType = this.getFormType();
    this.errorInfo = [];
    this.IOGrid = new IOGrid(this.formType);
    this.buildFormFields();    
    $('#s4-ribbonrow').hide();
    
    ///////////// Commented out the old JQuery UI calendar control ///////////////////////////////
    //this.initializeDatePicker($('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]'));
    //this.initializeDatePicker($('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]'));
    //////////////////////////////////////////////////////////////////////////////////////////////
    $('input[id^="POTotal_"]input[id$="_$CurrencyField"]').change(this.currencyFieldChanged.bind(this));
    $('#submitBtn').click(this.submitForm.bind(this));
    $('#cancelBtn').click(function () {window.location.href = 'https://microsoft.sharepoint.com/teams/cmrcentral/cmr-business-operations/Pages/POCOHomePage.aspx';}.bind(this));
    $('#onetidIOFile').change(this.attachFile.bind(this));
    this.isAdmin();
    //$('link[href="https://ajax.aspnetcdn.com/ajax/jquery.ui/1.10.4/themes/le-frog/jquery-ui.css"]').remove();
}
PORequestForm.prototype = {
    constructor: PORequestForm,
    buildFormFields: function () {
        if (this.formType.mode === 'newform_test.aspx' || this.formType.mode === 'editform.aspx') {  
            var ProjectTitle = $('input[id^="ProjectTitle_"]input[id$="_$TextField"]').detach();
            ProjectTitle.attr('placeholder', 'Name this project...');
            $('#ProjectTitle').append(ProjectTitle);
            var ProjectDescription = $('textarea[id^="ProjectDescription_"]textarea[id$="_$TextField"]').detach();
            ProjectDescription.attr('rows', 6);
            ProjectDescription.attr('placeholder', 'Describe the services the vendor will provide...');
            $('#ProjectDescription').append(ProjectDescription);
            var Currency = $('select[id^="Currency_"]select[id$="DropDownChoice"]').detach();
            $('#Currency').append(Currency);
            var POTotal = $('input[id^="POTotal_"]input[id$="_$CurrencyField"]').detach();
            POTotal.attr('placeholder', 'Enter the total cost...');
            $('#POTotal').append(POTotal);
            var PORequestor = $('div[id^="PORequestor_"]div[id$="_$ClientPeoplePicker"]').detach();
            $('#PORequestor').append(PORequestor);
            var POOwner = $('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').detach();
            $('#POOwner').append(POOwner);
            $('#POOwner').find('span[id^="POOwner"]span[id$="ClientPeoplePicker_InitialHelpText"]').text('Enter the name or email address of the person who will own this PO...');
            var VendorCompany = $('input[id^="VendorCompany_"]input[id$="_$TextField"]').detach();
            VendorCompany.attr('placeholder', 'Enter the vendor name here...');
            $('#VendorCompany').append(VendorCompany);
            var VendorNumber1 = $('input[id^="VendorNumber1_"]input[id$="_$TextField"]').detach();
            VendorNumber1.attr('placeholder', 'Enter the vendor number here...');
            //VendorNumber1.attr('maxlength', 7);
            VendorNumber1.removeAttr('maxlength');
            $('#VendorNumber1').append(VendorNumber1);
            var SAFEApprover = $('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').detach();
            $('#SAFEApprover').append(SAFEApprover);
            var InterimApprover = $('div[id^="InterimPOApprovers_"]div[id$="_$ClientPeoplePicker"]').detach();
            $('#InterimPOApprovers').append(InterimApprover);
            $('#InterimPOApprovers').find('span[id^="InterimPOApprovers"]span[id$="ClientPeoplePicker_InitialHelpText"]').text('Enter the names or email addresses of other people who need to approve this PO...');
            var InvoiceApprover = $('div[id^="InvoiceApprover_"]div[id$="_$ClientPeoplePicker"]').detach();
            $('#InvoiceApprover').append(InvoiceApprover);
            $('#InvoiceApprover').find('span[id^="InvoiceApprover"]span[id$="ClientPeoplePicker_InitialHelpText"]').text('Enter a name or email address...');
            var VendorContactEmail = $('input[id^="VendorContactEmail"]input[id$="_$TextField"]').detach();
            VendorContactEmail.attr('placeholder', 'Enter primary vendor contact email');
            $('#VendorContactEmail').append(VendorContactEmail);
            var VendorContactName = $('input[id^="VendorContactName_"]input[id$="_$TextField"]').detach();
            VendorContactName.attr('placeholder', 'Enter primary vendor contact name...');
            $('#VendorContactName').append(VendorContactName);
            /*var OutsourceArrangement = $('input[id^="OutsourceArrangement_"]input[id$="_$TextField"]').detach();
            OutsourceArrangement.attr('placeholder', 'Enter the name of the outsourced service here...');
            $('#OutsourceArrangement').append(OutsourceArrangement);*/
            /*var ExternalStaffAccessYes = $('table[id^="ExternalStaffAccess_"]table[id$="_ChoiceRadioTable"]').find('.ms-RadioText[title="Yes"]').detach();
            var ExternalStaffAccessNo = $('table[id^="ExternalStaffAccess_"]table[id$="_ChoiceRadioTable"]').find('.ms-RadioText[title="No"]').detach();
            $('#ExternalStaffAccess').append(ExternalStaffAccessYes);
            $('#ExternalStaffAccess').append(ExternalStaffAccessNo);*/
            var CommunicationPreferences = $('input[id^="CommunicationPreferences_"]input[id$="_$TextField"]').detach();
            CommunicationPreferences.attr('placeholder', 'Enter the full email addresses of individuals who need to follow the progress of this request...');
            $('#CommunicationPreferences').append(CommunicationPreferences);
            
            var AudienceDescription = $('#CMR_x0020_Audience_\\$container').siblings('.ms-metadata').first().text();
            var Audience = $('#CMR_x0020_Audience_\\$container').detach();
            $("#Audience").append(Audience);
            $('#CMR_x0020_Audience_\\$container').append("<span class='ms-descriptiontext'>" + AudienceDescription  + "</span>");
		
			
			var OrgSizeChoice0 = $('input[id^="OrganizationSize_"]input[id$="_MultiChoiceOption_0"]').detach();
			$('#OrgSize0Container').append(OrgSizeChoice0);
            $('#OrgSize0Container').append($('<div />', {'class': 'control__indicator'}));
            $('#OrgSize0Label').text($('label[for^="OrganizationSize_"]label[for$="_MultiChoiceOption_0"]').text());
			
			var OrgSizeChoice1 = $('input[id^="OrganizationSize_"]input[id$="_MultiChoiceOption_1"]').detach();
			$('#OrgSize1Container').append(OrgSizeChoice1 );
            $('#OrgSize1Container').append($('<div />', {'class': 'control__indicator'}));
            $('#OrgSize1Label').text($('label[for^="OrganizationSize_"]label[for$="_MultiChoiceOption_1"]').text());
			
			var OrgSizeChoice2 = $('input[id^="OrganizationSize_"]input[id$="_MultiChoiceOption_2"]').detach();
			$('#OrgSize2Container').append(OrgSizeChoice2 );
            $('#OrgSize2Container').append($('<div />', {'class': 'control__indicator'}));
            $('#OrgSize2Label').text($('label[for^="OrganizationSize_"]label[for$="_MultiChoiceOption_2"]').text());
			
			var OrgSizeChoice3 = $('input[id^="OrganizationSize_"]input[id$="_MultiChoiceOption_3"]').detach();
			$('#OrgSize3Container').append(OrgSizeChoice3 );
            $('#OrgSize3Container').append($('<div />', {'class': 'control__indicator'}));
            $('#OrgSize3Label').text($('label[for^="OrganizationSize_"]label[for$="_MultiChoiceOption_3"]').text());

            
            var ProductsAndTechnologiesDescription = $('#ProductsAndTechnologies_\\$container').siblings('.ms-metadata').first().text();
            var ProductsAndTechnologies = $('#ProductsAndTechnologies_\\$container').detach();
            $("#ProductsAndTechnologies").append(ProductsAndTechnologies);
            $('#ProductsAndTechnologies_\\$container').append("<span class='ms-descriptiontext'>" + ProductsAndTechnologiesDescription + "</span>");

			
            var CountryCoverage = $('#CountryCoverage0_\\$container').detach();
            //CountryCoverage.find('.ms-taxonomy-writeableregion').attr('data-placeholder', 'Select the country or countries covered by your research...');
            $('#CountryCoverage').append(CountryCoverage);    
            $('#CountryCoverage0_\\$container').append("<span class='ms-descriptiontext'>" + $('#CountryCoverage0_\\$input').siblings('.ms-metadata').first().text() + "</span>");
            
            var StartDate1 = $('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').detach();
            StartDate1.attr('autocomplete', 'off');           
            StartDate1.attr('placeholder', '00 / 00 / 0000');
            $('#StartDate1').append(StartDate1);
            
			$( function() {
				$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').datepicker({
					changeMonth: true,
					changeYear: true,
					minDate: +7
				});
				
			});
            
            var EndDate1 = $('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').detach();
            EndDate1.attr('autocomlete', 'off');
            EndDate1.attr('placeholder', '00 / 00 / 0000');
            $('#EndDate1').append(EndDate1);
            
			$( function() {
				$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').datepicker({
					changeMonth: true,
					changeYear: true,
					minDate: +8
				});
			});
            
            
            var LastMilestone = $('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').detach();
            LastMilestone.attr('autocomlete', 'off');
            LastMilestone.attr('placeholder', '00 / 00 / 0000');
            $('#LastMilestone').append(LastMilestone);
            var LastMilestonText = "<span class='ms-matadata last-milestone-text'>The end date and the last milestone date must be the same.</span>";
            $('#LastMilestone').append(LastMilestonText);

            
			$( function() {
				$('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').datepicker({
					changeMonth: true,
					changeYear: true,
					minDate: +6
				});
			});
            
            
            
            
            var ConfidentialData = $('table[id^="HasConfidentialData_"]table[id$="ChoiceRadioTable"]').detach();
            $('#ConfidentialData').append(ConfidentialData);
            
            var PersonalData = $('table[id^="HasPersonalData_"]table[id$="ChoiceRadioTable"]').detach();
            $('#PersonalData').append(PersonalData);

            
            var CSRResearchAreasChoice0 = $('input[id^="CSRResearchAreas_"]input[id$="_MultiChoiceOption_0"]').detach();
            $('#CSRResearchAreas0Container').append(CSRResearchAreasChoice0);
            $('#CSRResearchAreas0Container').append($('<div />', {'class': 'control__indicator'}));
            $('#CSRResearchAreas0Label').text($('label[for^="CSRResearchAreas_"]label[for$="_MultiChoiceOption_0"]').text());
            var CSRResearchAreasChoice1 = $('input[id^="CSRResearchAreas_"]input[id$="_MultiChoiceOption_1"]').detach();
            $('#CSRResearchAreas1Container').append(CSRResearchAreasChoice1);
            $('#CSRResearchAreas1Container').append($('<div />', {'class': 'control__indicator'}));
            $('#CSRResearchAreas1Label').text($('label[for^="CSRResearchAreas_"]label[for$="_MultiChoiceOption_1"]').text());
            var CSRResearchAreasChoice2 = $('input[id^="CSRResearchAreas_"]input[id$="_MultiChoiceOption_2"]').detach();
            $('#CSRResearchAreas2Container').append(CSRResearchAreasChoice2);
            $('#CSRResearchAreas2Container').append($('<div />', {'class': 'control__indicator'}));
            $('#CSRResearchAreas2Label').text($('label[for^="CSRResearchAreas_"]label[for$="_MultiChoiceOption_2"]').text());
            var CSRResearchAreasChoice3 = $('input[id^="CSRResearchAreas_"]input[id$="_MultiChoiceOption_3"]').detach();
            $('#CSRResearchAreas3Container').append(CSRResearchAreasChoice3);
            $('#CSRResearchAreas3Container').append($('<div />', {'class': 'control__indicator'}));
            $('#CSRResearchAreas3Label').text($('label[for^="CSRResearchAreas_"]label[for$="_MultiChoiceOption_3"]').text());
            var CSRResearchAreasChoice4 = $('input[id^="CSRResearchAreas_"]input[id$="_MultiChoiceOption_4"]').detach();
            $('#CSRResearchAreas4Container').append(CSRResearchAreasChoice4);
            $('#CSRResearchAreas4Container').append($('<div />', {'class': 'control__indicator'}));
            $('#CSRResearchAreas4Label').text($('label[for^="CSRResearchAreas_"]label[for$="_MultiChoiceOption_4"]').text());
            var CSRResearchAreasChoice5 = $('input[id^="CSRResearchAreas_"]input[id$="_MultiChoiceOption_5"]').detach();
            $('#CSRResearchAreas5Container').append(CSRResearchAreasChoice5);
            $('#CSRResearchAreas5Container').append($('<div />', {'class': 'control__indicator'}));
            $('#CSRResearchAreas5Label').text($('label[for^="CSRResearchAreas_"]label[for$="_MultiChoiceOption_5"]').text());
            var CSRResearchAreasChoice6 = $('input[id^="CSRResearchAreas_"]input[id$="_MultiChoiceOption_6"]').detach();
            $('#CSRResearchAreas6Container').append(CSRResearchAreasChoice6);
            $('#CSRResearchAreas6Container').append($('<div />', {'class': 'control__indicator'}));
            $('#CSRResearchAreas6Label').text($('label[for^="CSRResearchAreas_"]label[for$="_MultiChoiceOption_6"]').text());
            var CSRResearchAreasChoice7 = $('input[id^="CSRResearchAreas_"]input[id$="_MultiChoiceOption_7"]').detach();
            $('#CSRResearchAreas7Container').append(CSRResearchAreasChoice7);
            $('#CSRResearchAreas7Container').append($('<div />', {'class': 'control__indicator'}));
            $('#CSRResearchAreas7Label').text($('label[for^="CSRResearchAreas_"]label[for$="_MultiChoiceOption_7"]').text());
            var CSRResearchAreasChoice8 = $('input[id^="CSRResearchAreas_"]input[id$="_MultiChoiceOption_8"]').detach();
            $('#CSRResearchAreas8Container').append(CSRResearchAreasChoice8);
            $('#CSRResearchAreas8Container').append($('<div />', {'class': 'control__indicator'}));
            $('#CSRResearchAreas8Label').text($('label[for^="CSRResearchAreas_"]label[for$="_MultiChoiceOption_8"]').text());
            var CSRResearchAreasChoice9 = $('input[id^="CSRResearchAreas_"]input[id$="_MultiChoiceOption_9"]').detach();
            $('#CSRResearchAreas9Container').append(CSRResearchAreasChoice9);
            $('#CSRResearchAreas9Container').append($('<div />', {'class': 'control__indicator'}));
            $('#CSRResearchAreas9Label').text($('label[for^="CSRResearchAreas_"]label[for$="_MultiChoiceOption_9"]').text());
            var CSRResearchAreasChoice10 = $('input[id^="CSRResearchAreas_"]input[id$="_MultiChoiceOption_10"]').detach();
            $('#CSRResearchAreas10Container').append(CSRResearchAreasChoice10);
            $('#CSRResearchAreas10Container').append($('<div />', {'class': 'control__indicator'}));
            $('#CSRResearchAreas10Label').text($('label[for^="CSRResearchAreas_"]label[for$="_MultiChoiceOption_10"]').text());
            var CSRResearchAreasChoice11 = $('input[id^="CSRResearchAreas_"]input[id$="_MultiChoiceOption_11"]').detach();
            $('#CSRResearchAreas11Container').append(CSRResearchAreasChoice11);
            $('#CSRResearchAreas11Container').append($('<div />', {'class': 'control__indicator'}));
            $('#CSRResearchAreas11Label').text($('label[for^="CSRResearchAreas_"]label[for$="_MultiChoiceOption_11"]').text());
            var ResearchAreasChoice0 = $('input[id^="ResearchAreas_"]input[id$="_MultiChoiceOption_0"]').detach();
            $('#ResearchAreas0Container').append(ResearchAreasChoice0);
            $('#ResearchAreas0Container').append($('<div />', {'class': 'control__indicator'}));
            $('#ResearchAreas0Label').text($('label[for^="ResearchAreas_"]label[for$="_MultiChoiceOption_0"]').text());
            var ResearchAreasChoice1 = $('input[id^="ResearchAreas_"]input[id$="_MultiChoiceOption_1"]').detach();
            $('#ResearchAreas1Container').append(ResearchAreasChoice1);
            $('#ResearchAreas1Container').append($('<div />', {'class': 'control__indicator'}));
            $('#ResearchAreas1Label').text($('label[for^="ResearchAreas_"]label[for$="_MultiChoiceOption_1"]').text());
            var ResearchAreasChoice2 = $('input[id^="ResearchAreas_"]input[id$="_MultiChoiceOption_2"]').detach();
            $('#ResearchAreas2Container').append(ResearchAreasChoice2);
            $('#ResearchAreas2Container').append($('<div />', {'class': 'control__indicator'}));
            $('#ResearchAreas2Label').text($('label[for^="ResearchAreas_"]label[for$="_MultiChoiceOption_2"]').text());
            var ResearchAreasChoice3 = $('input[id^="ResearchAreas_"]input[id$="_MultiChoiceOption_3"]').detach();
            $('#ResearchAreas3Container').append(ResearchAreasChoice3);
            $('#ResearchAreas3Container').append($('<div />', {'class': 'control__indicator'}));
            $('#ResearchAreas3Label').text($('label[for^="ResearchAreas_"]label[for$="_MultiChoiceOption_3"]').text());
            var ResearchAreasChoice4 = $('input[id^="ResearchAreas_"]input[id$="_MultiChoiceOption_4"]').detach();
            $('#ResearchAreas4Container').append(ResearchAreasChoice4);
            $('#ResearchAreas4Container').append($('<div />', {'class': 'control__indicator'}));
            $('#ResearchAreas4Label').text($('label[for^="ResearchAreas_"]label[for$="_MultiChoiceOption_4"]').text());
            var ResearchAreasChoice5 = $('input[id^="ResearchAreas_"]input[id$="_MultiChoiceOption_5"]').detach();
            $('#ResearchAreas5Container').append(ResearchAreasChoice5);
            $('#ResearchAreas5Container').append($('<div />', {'class': 'control__indicator'}));
            $('#ResearchAreas5Label').text($('label[for^="ResearchAreas_"]label[for$="_MultiChoiceOption_5"]').text());

            var AppendedNotes = $('div[id^="AdditionalNotes_"]div[id$="_$TextField_topDiv"]').parent().next().detach();
            var AdditionalNotes = $('div[id^="AdditionalNotes_"]div[id$="_$TextField_topDiv"]').detach();
            $('#AdditionalNotesContainer').append(AdditionalNotes);
            $('#AdditionalNotesContainer').append(AppendedNotes.css({'margin-top': '10px'}));
            
            var AttachedFiles = $('#idAttachmentsTable').detach();
            $('.attachment-section').append(AttachedFiles);
            
           	//$('#idAttachmentsTable').find('tr').find('td.ms-vb').find('a').attr('target','_blank');
           	//$('#idAttachmentsTable').find('tr').find('td.ms-vb').find('a').removeAttr('onclick');
            

            $('div#AttachmentBtn').click(function(){
            	
				let addedFileCount = $('#idAttachmentsTable').find('tr').length;					
				let fileUploadCount = $('input[name^="fileupload"]').length;	
				let tbodyCount  =$('#idAttachmentsTable').find('tbody').length;
				console.log("AddedFiledCount: " + addedFileCount);
				console.log("fileUploadCount : " + fileUploadCount);
				console.log("tbodyCount : " + tbodyCount);
				
				//bind the change event handller for the new browse attachment control and 
				//trigger the OK button after the change
				$($('input[name^="fileupload"]')[fileUploadCount - 1]).change(function() {
					if(tbodyCount !==  0 ) {
						$('#attachOKbutton').trigger("click");
					}
				});
				$($('input[name^="fileupload"]')[fileUploadCount - 1]).trigger("click");			
            });
			
			/* Original function - 06/21/2019
            $('div#AttachmentBtn').click(function(){
            	
				var addedFileCount = $('#idAttachmentsTable').find('tr').length;	
				console.log("AddedFiledCount: " + addedFileCount);
				var fileUploadCount = $('input[name^="fileupload"]').length;	
				console.log("fileUploadCount : " + fileUploadCount);
				var tbodyCount  =$('#idAttachmentsTable').find('tbody').length;
				console.log("tbodyCount : " + tbodyCount);

				
				$($('input[name^="fileupload"]')[fileUploadCount - 1]).trigger("click");
				if(fileUploadCount > 1 || tbodyCount !==  0) {
					$('#attachOKbutton').trigger("click");					
				}				
            });
            */
                        
            /*
            var UploadSOW = $('#onetidIOFile').detach();
            var AttachedFiles = $('#idAttachmentsTable').detach();
            $('#uploadSOWContainer').append(UploadSOW);
            $('#uploadSOWContainer').append(AttachedFiles);
            */
            
            var POApprovalStatus = $('select[id^="POApprovalStatus_"]select[id$="_$DropDownChoice"]').detach();
            $('#POApprovalStatus').append(POApprovalStatus);
            var PONumber = $('input[id^="PONumber_"]input[id$="_$TextField"]').detach();
            PONumber.attr('maxlength', 8);
            $('#PONumber').append(PONumber);
            this.IOGrid.setData(this.getIOData());
        } else if (this.formType.mode === 'dispform.aspx') {
            $('#submitBtn').hide();
            $('.checkbox-container').hide();
            $('#addNewRowContainer').hide();
            var table = $('.ms-formtable');
            var rows = table.find('tr');
            for (var i = 0; i < rows.length; i++) {
                var row = $(rows[i]);
                var name = row.find('a').attr('name');
                if (typeof name !== 'undefined') {
                    name = name.substring(11);
                } 
                else {
                    continue;
                }
                var value = row.find('.ms-formbody');
                if (value.find('div').length > 0) {
                    value = value.find('div').text().trim();
                } else {
                    value = value.text().trim();
                }
                if (name === 'IOData') {
                    this.IOGrid.setData(JSON.parse(value));
                    $('.io-grid-input').attr('readonly', true);
                    $('.delete-img').hide();
                } else if (name === 'CSRResearchAreas' || name === 'ResearchAreas') {
                    value = value.split(';');
                    for (var j = 0; j < value.length; j++) {
                        $('#' + name).append($('<div />', {'class': 'disp-form-field', text: value[j]}));
                    }
                    
                } else if (name === "HasPersonalData") {
                	$("#PersonalData").append($('<input />', {'class': 'disp-form-field', type: 'text', value: value, 'readonly': true}));
                }  else if (name === "HasConfidentialData") {
                	$("#ConfidentialData").append($('<input />', {'class': 'disp-form-field', type: 'text', value: value, 'readonly': true}));
                } else if (name === "CMR_x0020_Audience") {
                	$("#Audience").append($('<input />', {'class': 'disp-form-field', type: 'text', value: value, 'readonly': true}));
                } else if (name === "CountryCoverage0"){
                	$('#CountryCoverage').append($('<input />', {'class': 'disp-form-field', type: 'text', value: value, 'readonly': true}));
				} else if (name ==="ProductsAndTechnologies") {
					$('#ProductsAndTechnologies').append($('<input />', {'class': 'disp-form-field', type: 'text', value: value, 'readonly': true}));
				} else if (name === "OrganizationSize") {
					$('#OrgSize').append($('<input />', {'class': 'disp-form-field', type: 'text', value: value, 'readonly': true}));
				
				}else if (name === 'Attachments') {
                    var attDiv = $('<div />').append(row.find('.ms-formbody').find('table'));
                    $('#uploadSOWContainer').append(attDiv);
                } else if (name === 'AdditionalNotes') {
                   // var notes = row.find('.ms-formbody').find('.ms-rtestate-field').next().detach();
	                    var notes = row.find('#SPFieldNote p').text();
                    $('#AdditionalNotesContainer').append(notes);
                }else {
                    $('#' + name).append($('<input />', {'class': 'disp-form-field', type: 'text', value: value, 'readonly': true}));
                }

            }
        }

    },
    getFormType: function () {
        var url = _spPageContextInfo.serverRequestPath;
        var type = url.substring(url.lastIndexOf('/') + 1);
        return {mode: type.toLowerCase(), name: 'Purchase Order'};
    },
    initializeDatePicker: function (jqEl) {
    	console.log(jqEl);
        if (jqEl) {        	
            jqEl.focus(function (e) {
                if (!$(e.currentTarget).hasClass('hasDatepicker')) {
                	console.log("fire");

                    jqEl.datepicker();
                }
            }.bind(this));
        }
    },
    attachFile: function () {
    	if($('#idAttachmentsTable').find('tr').length == 0) {
    		$('#attachOKbutton').trigger('click');
    	}
        $('#onetidIOFile').show();
    },
    getIOData: function () {
        var data = $('textarea[id^="IOData_"]textarea[id$="_$TextField"]').val();
        try {
            if (data !== '') {
                var parsed = JSON.parse(data);
                return parsed;
            } else {
                return [];
            }
        } catch (e) {
            return [];
        }
        return [];
    },
    currencyFieldChanged: function (e) {
        var value = $(e.currentTarget).val();
        if (value !== '') {
            value = Number(decommafyNum(value));
            value = value.toFixed(2);
            $(e.currentTarget).val(commafyNum(value));
        }
    },
    submitForm: function () {
        var ioData = this.IOGrid.getCurrentGridData();
        var submitBtn = $('[id$="_diidIOSaveItem"]');
        $('textarea[id^="IOData_"]textarea[id$="_$TextField"]').val(ioData);
        $('div[id^="iOData0_"] .ms-rtestate-write').empty();
        $('div[id^="iOData0_"] .ms-rtestate-write').append(htmlStr);

        this.validateForm();
        if (this.errorInfo.length === 0) {
            $(submitBtn[1]).trigger('click');
        } else {

        }
        

    },
    validateForm: function () {
        this.errorInfo = [];
        this.validateProjectTitle();
        this.validateProjectDescription();
        this.validateCurrency();
        this.validatePOTotal();
        this.validatePORequestor();
        this.validatePOOwner();
        this.validateSAFEApprover();
        this.validateInvoiceApprover();
        this.validateVendor();
        this.validateVendorNumber();
        this.validateCommunicationPreferences();
        this.validateStartDate();
        this.validateEndDate();
        this.validateStartDateEndDate();
        this.validateLastMilestone();
        this.validateEndDateLastMilestone();
        this.validateIOData();
        this.validatePersonalData();
		this.validateConfidentialData();
        this.validateCRSResearchAreas();
        this.validateResearchAreas();
        this.validateVendorNumber();
        this.validateVendorConcatName();
        this.validateVendorConcatEmail();
        //this.validateOutsourceArrangement();
        
        this.validateAudience();
        this.validateOrgSize();
        this.validateProductsAndTechnologies();
        this.validateCountryRegion();
        this.validateAttachment();
        this.validatePOOwnerSafeApprover();
        
        if (this.errorInfo.length > 0) {
            this.showValidationErrors();
        }

    },
    validateProductsAndTechnologies: function() {    
    	if($('#ProductsAndTechnologies_\\$container').find('.invalid-text').length) {
        	$('div[id^="ProductsAndTechnologies_"]div[id$="_$containereditableRegion"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
        	var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Products & Technologies cannot contain invalid term(s)<br></span></span>";
        	if($('#ProductsAndTechnologies_\\$container').parent().find('span.ms-csrformvalidation').length <= 0) {
	        	$('#ProductsAndTechnologies_\\$container').parent().append(errorMessage);
        	}
        	
        	$('div[id^="ProductsAndTechnologies_"]div[id$="_$containereditableRegion"]').click( function() {
        		if($('div[id^="ProductsAndTechnologies_"]div[id$="_$containereditableRegion"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('div[id^="ProductsAndTechnologies_"]div[id$="_$containereditableRegion"]').css({"border":"", "background-color": ""});
					$('#ProductsAndTechnologies_\\$container').parent().find('span.ms-csrformvalidation').remove();
				}
        	});
        	$('#ProductsAndTechnologies_\\$container').find('.ms-taxonomy-browser-button').click( function() {
        		if($('div[id^="ProductsAndTechnologies_"]div[id$="_$containereditableRegion"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('div[id^="ProductsAndTechnologies_"]div[id$="_$containereditableRegion"]').css({"border":"", "background-color": ""});
					$('#ProductsAndTechnologies_\\$container').parent().find('span.ms-csrformvalidation').remove();
				}
        	});   

			this.errorInfo.push({name: 'Products & Technologies', message: 'Products & Technologies cannot contain invalid term(s)'});
			return false;
		}
		else if(! $('#ProductsAndTechnologies_\\$container').find('.valid-text').length) {
        	$('div[id^="ProductsAndTechnologies_"]div[id$="_$containereditableRegion"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
        	var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Products & Technologies cannot be blank<br></span></span>";
        	if($('#ProductsAndTechnologies_\\$container').parent().find('span.ms-csrformvalidation').length <= 0) { 
        		$('#ProductsAndTechnologies_\\$container').parent().append(errorMessage);
        	}
        	
        	$('div[id^="ProductsAndTechnologies_"]div[id$="_$containereditableRegion"]').click( function() {
        		if($('div[id^="ProductsAndTechnologies_"]div[id$="_$containereditableRegion"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('div[id^="ProductsAndTechnologies_"]div[id$="_$containereditableRegion"]').css({"border":"", "background-color": ""});
					$('#ProductsAndTechnologies_\\$container').parent().find('span.ms-csrformvalidation').remove();
				}
        	});
        	$('#ProductsAndTechnologies_\\$container').find('.ms-taxonomy-browser-button').click( function() {
        		if($('div[id^="ProductsAndTechnologies_"]div[id$="_$containereditableRegion"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('div[id^="ProductsAndTechnologies_"]div[id$="_$containereditableRegion"]').css({"border":"", "background-color": ""});
					$('#ProductsAndTechnologies_\\$container').parent().find('span.ms-csrformvalidation').remove();
				}
        	});       	
		
			this.errorInfo.push({name: 'Products & Technologies', message: 'Products & Technologies cannot be blank'});
			return false;
		}
		return true;
    },
    validateAudience: function () {
		if($('#CMR_x0020_Audience_\\$container').find('.invalid-text').length) {
        	$('div[id^="CMR_x0020_Audience_"]div[id$="_$containereditableRegion"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
        	var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Audience cannot contain invalid term(s)<br></span></span>";
        	if($('#CMR_x0020_Audience_\\$container').parent().find('span.ms-csrformvalidation').length <= 0) {
		       	$('#CMR_x0020_Audience_\\$container').parent().append(errorMessage);
		    }
        	
        	$('div[id^="CMR_x0020_Audience_"]div[id$="_$containereditableRegion"]').click( function() {
        		if($('div[id^="CMR_x0020_Audience_"]div[id$="_$containereditableRegion"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('div[id^="CMR_x0020_Audience_"]div[id$="_$containereditableRegion"]').css({"border":"", "background-color": ""});
					$('#CMR_x0020_Audience_\\$container').parent().find('span.ms-csrformvalidation').remove();
				}
        	});
        	$('#CMR_x0020_Audience_\\$container').find('.ms-taxonomy-browser-button').click( function() {
        		if($('div[id^="CMR_x0020_Audience_"]div[id$="_$containereditableRegion"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('div[id^="CMR_x0020_Audience_"]div[id$="_$containereditableRegion"]').css({"border":"", "background-color": ""});
					$('#CMR_x0020_Audience_\\$container').parent().find('span.ms-csrformvalidation').remove();
				}
        	});  		
		
			this.errorInfo.push({name: 'Audience', message: 'Audience cannot contain invalid term(s)'});
			return false;
		}
		else if(! $('#CMR_x0020_Audience_\\$container').find('.valid-text').length) {
        	$('div[id^="CMR_x0020_Audience_"]div[id$="_$containereditableRegion"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
        	var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Audience cannot be blank<br></span></span>";
        	if($('#CMR_x0020_Audience_\\$container').parent().find('span.ms-csrformvalidation').length <= 0) {
		       	$('#CMR_x0020_Audience_\\$container').parent().append(errorMessage);
		    }
        	
        	$('div[id^="CMR_x0020_Audience_"]div[id$="_$containereditableRegion"]').click( function() {
        		if($('div[id^="CMR_x0020_Audience_"]div[id$="_$containereditableRegion"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('div[id^="CMR_x0020_Audience_"]div[id$="_$containereditableRegion"]').css({"border":"", "background-color": ""});
					$('#CMR_x0020_Audience_\\$container').parent().find('span.ms-csrformvalidation').remove();
				}
        	});
        	$('#CMR_x0020_Audience_\\$container').find('.ms-taxonomy-browser-button').click( function() {
        		if($('div[id^="CMR_x0020_Audience_"]div[id$="_$containereditableRegion"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('div[id^="CMR_x0020_Audience_"]div[id$="_$containereditableRegion"]').css({"border":"", "background-color": ""});
					$('#CMR_x0020_Audience_\\$container').parent().find('span.ms-csrformvalidation').remove();
				}
        	});  
        			
			this.errorInfo.push({name: 'Audience', message: 'Audience cannot be blank'});
			return false;
		}
		return true;
	},
	validateCountryRegion:function () {
		if($('#CountryCoverage0_\\$container').find('.invalid-text').length) {
        	$('div[id^="CountryCoverage0_"]div[id$="_$containereditableRegion"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
        	var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Country Coverage cannot contain invalid term(s)<br></span></span>";
        	if($('#CountryCoverage0_\\$container').parent().find('span.ms-csrformvalidation').length <= 0) {
		       	$('#CountryCoverage0_\\$container').parent().append(errorMessage);
		    }
        	
        	$('div[id^="CountryCoverage0_"]div[id$="_$containereditableRegion"]').click( function() {
        		if($('div[id^="CountryCoverage0_"]div[id$="_$containereditableRegion"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('div[id^="CountryCoverage0_"]div[id$="_$containereditableRegion"]').css({"border":"", "background-color": ""});
					$('#CountryCoverage0_\\$container').parent().find('span.ms-csrformvalidation').remove();
				}
        	});
        	$('#CountryCoverage0_\\$container').find('.ms-taxonomy-browser-button').click( function() {
        		if($('div[id^="CountryCoverage0_"]div[id$="_$containereditableRegion"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('div[id^="CountryCoverage0_"]div[id$="_$containereditableRegion"]').css({"border":"", "background-color": ""});
					$('#CountryCoverage0_\\$container').parent().find('span.ms-csrformvalidation').remove();
				}
        	});  		
				
			this.errorInfo.push({name: 'Country Coverage', message: 'Country Coverage cannot contain invalid term(s)'});
			return false;
		}
		else if(! $('#CountryCoverage0_\\$container').find('.valid-text').length) {
        	$('div[id^="CountryCoverage0_"]div[id$="_$containereditableRegion"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
        	var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Country Coverage cannot be blank<br></span></span>";
        	if($('#CountryCoverage0_\\$container').parent().find('span.ms-csrformvalidation').length <= 0) {
		       	$('#CountryCoverage0_\\$container').parent().append(errorMessage);
		    }
        	
        	$('div[id^="CountryCoverage0_"]div[id$="_$containereditableRegion"]').click( function() {
        		if($('div[id^="CountryCoverage0_"]div[id$="_$containereditableRegion"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('div[id^="CountryCoverage0_"]div[id$="_$containereditableRegion"]').css({"border":"", "background-color": ""});
					$('#CountryCoverage0_\\$container').parent().find('span.ms-csrformvalidation').remove();
				}
        	});
        	$('#CountryCoverage0_\\$container').find('.ms-taxonomy-browser-button').click( function() {
        		if($('div[id^="CountryCoverage0_"]div[id$="_$containereditableRegion"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('div[id^="CountryCoverage0_"]div[id$="_$containereditableRegion"]').css({"border":"", "background-color": ""});
					$('#CountryCoverage0_\\$container').parent().find('span.ms-csrformvalidation').remove();
				}
        	});  
		
		
			this.errorInfo.push({name: 'Country Coverage', message: 'Country Coverage cannot be blank'});
			return false;
		}
		return true;
	},
	validateOrgSize: function() {
		var inputs = $('.org-size').find('input[type="checkbox"]');
        for (var i = 0; i < inputs.length; i++) {
            var input = $(inputs[i]);
            if ($(input).is(':checked')) {
                return true;
            }
        }
        
        $('.org-size').find('input[type="checkbox"]').next().css("cssText", "border: 1 solid red; background-color: #ffdddd !important;");
        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Organization Size must have a selection<br></span></span>";
        if($('#OrgSize').find('span.ms-csrformvalidation').length <= 0) {
			$('#OrgSize').append(errorMessage);
		}        
        
        $('.org-size').find('input[type="checkbox"]').next().click( function () {
        	if($(this).css("background-color") == "rgb(255, 221, 221)") {
        		$('.org-size').find('input[type="checkbox"]').next().css("cssText", "");
				$('#OrgSize').find('span.ms-csrformvalidation').remove();
        	}     
        });
        
        this.errorInfo.push({name: 'Organization Size', message: 'Organization Size must have a selection'});
        return false;

	},
    validateProjectTitle: function () {
        var pTitle = $('input[id^="ProjectTitle_"]input[id$="_$TextField"]').val();
        if (pTitle === '') {
        
        	$('input[id^="ProjectTitle_"]input[id$="_$TextField"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Project Title cannot be blank<br></span></span>";
  	        if($('input[id^="ProjectTitle_"]input[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').length <= 0) {
  	        	$('input[id^="ProjectTitle_"]input[id$="_$TextField"]').parent().append(errorMessage);
  	        }
			
			$('input[id^="ProjectTitle_"]input[id$="_$TextField"]').keypress( function() {
				if($('input[id^="ProjectTitle_"]input[id$="_$TextField"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('input[id^="ProjectTitle_"]input[id$="_$TextField"]').css({"border":"", "background-color": ""});
					$('input[id^="ProjectTitle_"]input[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').remove();
				}
			
			});
			
        	
            this.errorInfo.push({name: 'Project Title', message: 'Project Title cannot be blank' });
            return false;
        }
        return true;
    },
    validateProjectDescription: function () {
        var pDesc = $('textarea[id^="ProjectDescription_"]textarea[id$="_$TextField"]').val();
        if (pDesc === '') {
        
        	$('textarea[id^="ProjectDescription_"]textarea[id$="_$TextField"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Project Description cannot be blank<br></span></span>";
  	        if($('textarea[id^="ProjectDescription_"]textarea[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').length <= 0) {
  	        	$('textarea[id^="ProjectDescription_"]textarea[id$="_$TextField"]').parent().append(errorMessage);
  	        }
			
			$('textarea[id^="ProjectDescription_"]textarea[id$="_$TextField"]').keypress( function() {
				if($('textarea[id^="ProjectDescription_"]textarea[id$="_$TextField"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('textarea[id^="ProjectDescription_"]textarea[id$="_$TextField"]').css({"border":"", "background-color": ""});
					$('textarea[id^="ProjectDescription_"]textarea[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').remove();
				}
			
			});			
        
            this.errorInfo.push({name: 'Project Description', message: 'Project Description cannot be blank'});
            return false;
        }
        return true;
    },
    validateCurrency: function () {
        var currency = $('select[id^="Currency_"]select[id$="DropDownChoice"]').val();
        console.log(currency);
        if (currency === '') {
        
        	$('select[id^="Currency_"]select[id$="DropDownChoice"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Currency cannot be blank<br></span></span>";
  	        if($('select[id^="Currency_"]select[id$="DropDownChoice"]').parent().find('span.ms-csrformvalidation').length <= 0) {
  	        	$('select[id^="Currency_"]select[id$="DropDownChoice"]').parent().append(errorMessage);
  	        }
			
			$('select[id^="Currency_"]select[id$="DropDownChoice"]').click( function() {
				if($('select[id^="Currency_"]select[id$="DropDownChoice"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('select[id^="Currency_"]select[id$="DropDownChoice"]').css({"border":"", "background-color": ""});
					$('select[id^="Currency_"]select[id$="DropDownChoice"]').parent().find('span.ms-csrformvalidation').remove();
				}
			
			});		
			        
            this.errorInfo.push({name: 'Currency', message: 'Currency cannot be blank'});
            return false;
        }
        return true;
    },
    validatePOTotal: function () {
        var poTotal = $('input[id^="POTotal_"]input[id$="_$CurrencyField"]').val();
        
        if (poTotal === '') {
        
        	$('input[id^="POTotal_"]input[id$="_$CurrencyField"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">PO Total cannot be blank<br></span></span>";
  	        if($('input[id^="POTotal_"]input[id$="_$CurrencyField"]').parent().find('span.ms-csrformvalidation').length <= 0) {
  	        	$('input[id^="POTotal_"]input[id$="_$CurrencyField"]').parent().append(errorMessage);
  	        }
			
			$('input[id^="POTotal_"]input[id$="_$CurrencyField"]').keypress( function() {
				if($('input[id^="POTotal_"]input[id$="_$CurrencyField"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('input[id^="POTotal_"]input[id$="_$CurrencyField"]').css({"border":"", "background-color": ""});
					$('input[id^="POTotal_"]input[id$="_$CurrencyField"]').parent().find('span.ms-csrformvalidation').remove();
				}
			
			});		        
            this.errorInfo.push({name: 'PO Total', message: 'PO Total cannot be blank'});
            return false;
        }
        return true;
    },
    validateVendorConcatEmail: function () {
    	var vce = $('input[id^="VendorContactEmail"]input[id$="_$TextField"]').val();
    	if (vce === '') {
    	
        	$('input[id^="VendorContactEmail"]input[id$="_$TextField"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Vendor Contact Email cannot be blank<br></span></span>";
  	        if($('input[id^="VendorContactEmail"]input[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').length <= 0) {
  	        	$('input[id^="VendorContactEmail"]input[id$="_$TextField"]').parent().append(errorMessage);
  	        }
			
			$('input[id^="VendorContactEmail"]input[id$="_$TextField"]').keypress( function() {
				if($('input[id^="VendorContactEmail"]input[id$="_$TextField"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('input[id^="VendorContactEmail"]input[id$="_$TextField"]').css({"border":"", "background-color": ""});
					$('input[id^="VendorContactEmail"]input[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').remove();
				}
			
			});	
			    	
    		this.errorInfo.push({name: 'Vendor Contact Email', message: 'Vendor Contact Email cannot be blank'});
    		return false;
    	} else {
    		//var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    		//if(emailRed.test(vce)
            var regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
			if(vce.endsWith(';')) {
                vce = vce.substring(0, vce.lastIndexOf(';'))
                $('input[id^="VendorContactEmail"]input[id$="_$TextField"]').val(vce);
            }
            var emails = vce.split(';');
            for (var i = 0; i < emails.length; i++) {
                var result = regex.test(emails[i].trim());
                if (result === false) {
                
		        	$('input[id^="VendorContactEmail"]input[id$="_$TextField"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
		  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Vendor Contact Email must be valid email address. If there are multiple email addresses, please use a semi-colon delimited list of emails \n Example: user@contoso.com; user2@constoso.com<br></span></span>";
		  	        if($('input[id^="VendorContactEmail"]input[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').length <= 0) {
		  	        	$('input[id^="VendorContactEmail"]input[id$="_$TextField"]').parent().append(errorMessage);
		  	        }
					
					$('input[id^="VendorContactEmail"]input[id$="_$TextField"]').keypress( function() {
						if($('input[id^="VendorContactEmail"]input[id$="_$TextField"]').css("background-color") == "rgb(255, 221, 221)") {
			        		$('input[id^="VendorContactEmail"]input[id$="_$TextField"]').css({"border":"", "background-color": ""});
							$('input[id^="VendorContactEmail"]input[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').remove();
						}
					
					});	
                
                    this.errorInfo.push({name: 'Vendor Contact Email', message: 'Vendor Contact Email must be valid email address. If there are multiple email addresses, please use a semi-colon delimited list of emails \n Example: user@contoso.com; user2@constoso.com'});
                    return false;
                }
            }
            return true;
    		
    		
    	}
    	return true;        	
    },
    validateVendorConcatName: function () {
    	var vcn = $('input[id^="VendorContactName_"]input[id$="_$TextField"]').val();
    	if (vcn === '') {
    
        	$('input[id^="VendorContactName_"]input[id$="_$TextField"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Vendor Contact Name cannot be blank<br></span></span>";
  	        if($('input[id^="VendorContactName_"]input[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').length <= 0) {
  	        	$('input[id^="VendorContactName_"]input[id$="_$TextField"]').parent().append(errorMessage);
  	        }
			
			$('input[id^="VendorContactName_"]input[id$="_$TextField"]').keypress( function() {
				if($('input[id^="VendorContactName_"]input[id$="_$TextField"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('input[id^="VendorContactName_"]input[id$="_$TextField"]').css({"border":"", "background-color": ""});
					$('input[id^="VendorContactName_"]input[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').remove();
				}
			
			});	
			
    		this.errorInfo.push({name: 'Vendor Contact Name', message: 'Vendor Contact Name cannot be blank'});
    		return false;
    	}
    	return true;
    },
    validatePORequestor: function () {
        var pp = $('input[id^="PORequestor_"]input[id$="_$ClientPeoplePicker_EditorInput"]').attr('aria-label');
        if (typeof pp === 'undefined' || pp === '') {
        
        	$('div[id^="PORequestor_"]div[id$="_$ClientPeoplePicker"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">PO Requestor cannot be blank<br></span></span>";
  	        if($('div[id^="PORequestor_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').length <= 0) {
  	        	$('div[id^="PORequestor_"]div[id$="_$ClientPeoplePicker"]').parent().append(errorMessage);
  	        	$('div[id^="PORequestor_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "50px");

  	        }
			
			$('div[id^="PORequestor_"]div[id$="_$ClientPeoplePicker"]').keypress( function() {
				if($('div[id^="PORequestor_"]div[id$="_$ClientPeoplePicker"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('div[id^="PORequestor_"]div[id$="_$ClientPeoplePicker"]').css({"border":"", "background-color": ""});
					$('div[id^="PORequestor_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').remove();
					$('div[id^="PORequestor_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "20px");

				}
			
			});				        
        
            this.errorInfo.push({name: 'PO Requestor', message: 'PO Requestor cannot be blank'});
            return false;
        }
        return true;
    },
    validatePOOwner: function () {
      var poOwner = $('input[id^="POOwner_"]input[id$="_$ClientPeoplePicker_EditorInput"]').attr('aria-label');
        if (typeof poOwner === 'undefined' || poOwner === '') {
        
        	$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">PO Owner cannot be blank<br></span></span>";
  	        if($('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').length <= 0) {
  	        	$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').parent().append(errorMessage);
  	        	$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "50px");

  	        }
			
			$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').keypress( function() {
				if($('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').css({"border":"", "background-color": ""});
					$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').remove();
					$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "20px");

				}
			
			});	
			        
            this.errorInfo.push({name: 'PO Owner', message: 'PO Owner cannot be blank'});
            return false
        }
        return true;
    },
    validateSAFEApprover: function () {
        var pp = $('input[id^="SAFEApprover_"]input[id$="_$ClientPeoplePicker_EditorInput"]').attr('aria-label');
        if (typeof pp === 'undefined' || pp === '') {
        
        	$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">SAFE Approver cannot be blank<br></span></span>";
  	        if($('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').length <= 0) {
  	        	$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().append(errorMessage);
  	        	$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "50px");

  	        }
			
			$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').keypress( function() {
				if($('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').css({"border":"", "background-color": ""});
					$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').remove();
					$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "20px");

				}
			
			});	
        
            this.errorInfo.push({name: 'SAFE Approver', message: 'SAFE Approver cannot be blank'});
            return false;
        }
        return true;
    },
    validateInvoiceApprover: function () {
        var pp = $('input[id^="InvoiceApprover_"]input[id$="_$ClientPeoplePicker_EditorInput"]').attr('aria-label');
        if (typeof pp === 'undefined' || pp === '') {
        
        	$('div[id^="InvoiceApprover_"]div[id$="_$ClientPeoplePicker"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Invoice Approver cannot be blank<br></span></span>";
  	        if($('div[id^="InvoiceApprover_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').length <= 0) {
  	        	$('div[id^="InvoiceApprover_"]div[id$="_$ClientPeoplePicker"]').parent().append(errorMessage);
  	        	$('div[id^="InvoiceApprover_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "50px");

  	        }
			
			$('div[id^="InvoiceApprover_"]div[id$="_$ClientPeoplePicker"]').keypress( function() {
				if($('div[id^="InvoiceApprover_"]div[id$="_$ClientPeoplePicker"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('div[id^="InvoiceApprover_"]div[id$="_$ClientPeoplePicker"]').css({"border":"", "background-color": ""});
					$('div[id^="InvoiceApprover_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').remove();
					$('div[id^="InvoiceApprover_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "20px");

				}
			
			});	
                
            this.errorInfo.push({name: 'Invoice Approver', message: 'Invoice Approver cannot be blank'});
            return false;
        }
        return true;
    },
    validatePOOwnerSafeApprover: function () {
        var poOwner = $('input[id^="POOwner_"]input[id$="_$ClientPeoplePicker_EditorInput"]').attr('aria-label');
        var safeApprover = $('input[id^="SAFEApprover_"]input[id$="_$ClientPeoplePicker_EditorInput"]').attr('aria-label');
        
        var poOwnerResolved = $('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').find('span.sp-peoplepicker-userSpan').attr('sid');
        var safeApproverResolved = $('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').find('span.sp-peoplepicker-userSpan').attr('sid');
		
        
        if (typeof safeApprover !== 'undefined' && safeApprover !== '' && typeof poOwner !== 'undefined' && poOwner !== '')  {
        	if(poOwnerResolved == safeApproverResolved) {
        	
        	$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">PO Owner and SAFE Approver cannot be the same<br></span></span>";
  	        if($('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').length <= 0) {
  	        	$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().append(errorMessage);
  	        	$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "50px");

  	        }
			
			$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').keypress( function() {
				if($('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').css({"border":"", "background-color": ""});
					$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').remove();
					$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "20px");
				}
				if($('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').css({"border":"", "background-color": ""});
					$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').remove();
					$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "20px");
				}
			
			});	
        
            this.errorInfo.push({name: 'SAFE Approver', message: 'PO Owner and SAFE Approver cannot be the same'});
            
           	$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">PO Owner and SAFE Approver cannot be the same<br></span></span>";
  	        if($('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').length <= 0) {
  	        	$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').parent().append(errorMessage);
  	        	$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "50px");

  	        }
			
			$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').keypress( function() {
				if($('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').css({"border":"", "background-color": ""});
					$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').remove();
					$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "20px");
				}
				if($('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').css({"border":"", "background-color": ""});
					$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').remove();
					$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "20px");
				}							
			});	
			        
            this.errorInfo.push({name: 'PO Owner', message: 'PO Owner and SAFE Approver cannot be the same'});

            
            
            
            return false;
        	
			} 
        	return true;
        }
        return true;
        

    },
    /*validateOutsourceArrangement: function () {
        var pTitle = $('input[id^="OutsourceArrangement_"]input[id$="_$TextField"]').val();
        if (pTitle === '') {
            this.errorInfo.push({name: 'Outsource Arrangement', message: 'Outsource Arrangement cannot be blank' });
            return false;
        }
        return true;
    },*/
    validateVendor: function() {
    	var vendor = $('#VendorCompany_e3b78cf3-02ac-4ad2-b73e-dc92cd9bd93c_\\$TextField').val();
    	if(vendor === '') {
        	$('input[id^="VendorCompany_"]input[id$="_$TextField"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Vendor cannnot be blank<br></span></span>";
  	        if($('input[id^="VendorCompany_"]input[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').length <= 0) {
  	        	$('input[id^="VendorCompany_"]input[id$="_$TextField"]').parent().append(errorMessage);
  	        }
			
			$('input[id^="VendorCompany_"]input[id$="_$TextField"]').keypress( function() {
				if($('input[id^="VendorCompany_"]input[id$="_$TextField"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('input[id^="VendorCompany_"]input[id$="_$TextField"]').css({"border":"", "background-color": ""});
					$('input[id^="VendorCompany_"]input[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').remove();
				}
			
			});	
    	
    		this.errorInfo.push({name: 'Vendor', message: 'Vendor cannnot be blank'});
    	}
    },    
    validateVendorNumber: function () {
        var vendorNumber = $('input[id^="VendorNumber1_"]input[id$="_$TextField"]').val();
        if (vendorNumber !== '') {
            if (vendorNumber.length <= 10  &&  vendorNumber % 1 === 0) {
                return true;
            } else {
            
	        	$('input[id^="VendorNumber1_"]input[id$="_$TextField"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
	  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Vendor Number must be less than or equal to 10 numerical digits<br></span></span>";
	  	        if($('input[id^="VendorNumber1_"]input[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').length <= 0) {
	  	        	$('input[id^="VendorNumber1_"]input[id$="_$TextField"]').parent().append(errorMessage);
	  	        }
				
				$('input[id^="VendorNumber1_"]input[id$="_$TextField"]').keypress( function() {
					if($('input[id^="VendorNumber1_"]input[id$="_$TextField"]').css("background-color") == "rgb(255, 221, 221)") {
		        		$('input[id^="VendorNumber1_"]input[id$="_$TextField"]').css({"border":"", "background-color": ""});
						$('input[id^="VendorNumber1_"]input[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').remove();
					}
				
				});	
            
                this.errorInfo.push({name: 'Vendor Number', message: 'Vendor Number must be less than or equal to 10 numerical digits'});
                return false;
            }
        } else if (vendorNumber === '') {
        
        	$('input[id^="VendorNumber1_"]input[id$="_$TextField"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Vendor Number cannot be blank<br></span></span>";
  	        if($('input[id^="VendorNumber1_"]input[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').length <= 0) {
  	        	$('input[id^="VendorNumber1_"]input[id$="_$TextField"]').parent().append(errorMessage);
  	        }
			
			$('input[id^="VendorNumber1_"]input[id$="_$TextField"]').keypress( function() {
				if($('input[id^="VendorNumber1_"]input[id$="_$TextField"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('input[id^="VendorNumber1_"]input[id$="_$TextField"]').css({"border":"", "background-color": ""});
					$('input[id^="VendorNumber1_"]input[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').remove();
				}
			
			});	
        
        	this.errorInfo.push({name: 'Vendor Number', message: 'Vendor Number cannot be blank'});
        	return false;        	
        }
        return true;
    },
    validateCommunicationPreferences: function () {
        var cp = $('input[id^="CommunicationPreferences_"]input[id$="_$TextField"]').val();
        if (cp !== '') {
            var regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            if (cp.endsWith(';')) {
                cp = cp.substring(0, cp.lastIndexOf(';'))
                $('input[id^="CommunicationPreferences_"]input[id$="_$TextField"]').val(cp);
            }
            var emails = cp.split(';');
            for (var i = 0; i < emails.length; i++) {
                var result = regex.test(emails[i].trim());
                if (result === false) {
                
		        	$('input[id^="CommunicationPreferences_"]input[id$="_$TextField"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
		  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Communication Preferences must be a semi-colon delimited list of emails \n Example: user@contoso.com; user2@constoso.com<br></span></span>";
		  	        if($('input[id^="CommunicationPreferences_"]input[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').length <= 0) {
		  	        	$('input[id^="CommunicationPreferences_"]input[id$="_$TextField"]').parent().append(errorMessage);
		  	        }
					
					$('input[id^="CommunicationPreferences_"]input[id$="_$TextField"]').keypress( function() {
						if($('input[id^="CommunicationPreferences_"]input[id$="_$TextField"]').css("background-color") == "rgb(255, 221, 221)") {
			        		$('input[id^="CommunicationPreferences_"]input[id$="_$TextField"]').css({"border":"", "background-color": ""});
							$('input[id^="CommunicationPreferences_"]input[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').remove();
						}
					
					});	
                
                    this.errorInfo.push({name: 'CC', message: 'Communication Preferences must be a semi-colon delimited list of emails \n Example: user@contoso.com; user2@constoso.com'});
                    return false;
                }
            }
            return true;
        }

        return true;
    },
    validateStartDate: function () {
        var sd = $('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').val();
        if (sd === '') {
        	$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
        	var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation datevalidation\"><span role=\"alert\">Start Date cannot be blank<br></span></span>";
        	if($('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').parent().find('span.ms-csrformvalidation').length <=0) {
        		$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').parent().append(errorMessage);
        	}
        	
        	$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').click( function() {
        		$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"", "background-color": ""});
				$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').parent().find('span').remove();
        	});        
        
            this.errorInfo.push({name: 'Start Date', message: 'Start Date cannot be blank'});
            return false;
        } else if (sd !== '') {
            var regex = new RegExp(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
            if (regex.test(sd) === true) {
            	
            	//Compare entered start date with today's date + 3 days            	
            	var today = new Date();
				today.setDate(today.getDate() + 2); 
				var esd = new Date(sd);
				if(((esd-today)/1000/60/60/24)<0) {
		        	$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
		        	var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation datevalidation\"><span role=\"alert\">Start Date cannot be earlier than 5 days after today<br></span></span>";
		        	if($('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').parent().find('span.ms-csrformvalidation').length <=0) {
		        		$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').parent().append(errorMessage);
		        	}
		        	
		        	$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').click( function() {
		        		$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"", "background-color": ""});
						$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').parent().find('span.ms-csrformvalidation').remove();
		        	});    
	        	    this.errorInfo.push({name: 'Start Date', message: 'Start Date cannot be earlier than 3 days after today'});
	                return false;			
				} else { return true; }
            } else {
            
	        	$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
	        	var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation datevalidation\"><span role=\"alert\">Start Date must be in the format of MM/DD/YYYY<br></span></span>";
	        	if($('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').parent().find('span.ms-csrformvalidation').length <=0) {
	        		$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').parent().append(errorMessage);
	        	}
	        	
	        	$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').click( function() {
	        		$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"", "background-color": ""});
					$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').parent().find('span.ms-csrformvalidation').remove();
	        	});    
        	    this.errorInfo.push({name: 'Start Date', message: 'Start Date must be in the format of MM/DD/YYYY'});
                return false;
            }
        }
        return true;
    },
    validateEndDate: function () {
        var ed = $('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').val();
        if (ed !== '') {
            var regex = new RegExp(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
            if (regex.test(ed) === true) {
                return true;
            } else {            	
	        	$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
	        	var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation datevalidation\"><span role=\"alert\">End Date must be in the format of MM/DD/YYYY<br></span></span>";
	        	if($('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').parent().find('span.ms-csrformvalidation').length <=0) {
	        		$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').parent().append(errorMessage);
	        	}
	        	
	        	$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').click( function() {
	        		$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"", "background-color": ""});
					$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').parent().find('span.ms-csrformvalidation').remove();
	        	}); 
            
                this.errorInfo.push({name: 'End Date', message: 'End Date must be in the format of MM/DD/YYYY'});
                return false;
            }
        } else if (ed === '') {
        	$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
        	var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation datevalidation\"><span role=\"alert\">End Date cannot be blank<br></span></span>";
        	if($('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').parent().find('span.ms-csrformvalidation').length <=0) {
        		$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').parent().append(errorMessage);
        	}
        	
        	$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').click( function() {
        		$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"", "background-color": ""});
				$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').parent().find('span.ms-csrformvalidation').remove();
        	}); 
        	        
        	this.errorInfo.push({name: 'End Date', message: 'End Date cannot be blank'});
        	return false;
        }
        return true;
    },
    validateLastMilestone: function () {
        var ed = $('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').val();
        if (ed !== '') {
            var regex = new RegExp(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
            if (regex.test(ed) === true) {
                return true;
            } else {            	
	        	$('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
	        	var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation datevalidation\"><span role=\"alert\">Last Milestone Date must be in the format of MM/DD/YYYY<br></span></span>";
	        	if($('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').parent().find('span.ms-csrformvalidation').length <=0) {
	        		$('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').parent().append(errorMessage);
	        	}
	        	
	        	$('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').click( function() {
	        		$('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').css({"border":"", "background-color": ""});
					$('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').parent().find('span.ms-csrformvalidation').remove();
	        	}); 
            
                this.errorInfo.push({name: 'Last Milestone Date', message: 'Last Milestone Date must be in the format of MM/DD/YYYY'});
                return false;
            }
        } else if (ed === '') {
        	$('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
        	var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation datevalidation\"><span role=\"alert\">Last Milestone Date cannot be blank<br></span></span>";
        	if($('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').parent().find('span.ms-csrformvalidation').length <=0) {
        		$('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').parent().append(errorMessage);
        	}
        	
        	$('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').click( function() {
        		$('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').css({"border":"", "background-color": ""});
				$('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').parent().find('span.ms-csrformvalidation').remove();
        	}); 
        	        
        	this.errorInfo.push({name: 'Last Milestone Date', message: 'Last Milestone Date cannot be blank'});
        	return false;
        }
        return true;
    },
    validateStartDateEndDate: function () {
        var sd = $('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').val();
        var ed = $('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').val();
        if (sd !== '' && ed !== '') {
        	var esd = new Date(sd);
			var eed = new Date(ed);
			if(((eed-esd)/1000/60/60/24)<=0) {
			
	        	$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
	        	var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation datevalidation\"><span role=\"alert\">End Date cannot be the same or earlier than Start Date<br></span></span>";
	        	$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').parent().append(errorMessage);
	        	
	        	$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').click( function() {
	        		$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"", "background-color": ""});
					$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').parent().find('span').remove();
	        		$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"", "background-color": ""});
					$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').parent().find('span').remove();
	        	});    
			
	        	$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
	        	var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation datevalidation\"><span role=\"alert\">End Date cannot be the same or earlier than Start Date<br></span></span>";
	        	$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').parent().append(errorMessage);
	        	
	        	$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').click( function() {
	        		$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"", "background-color": ""});
					$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').parent().find('span').remove();
	        		$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"", "background-color": ""});
					$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').parent().find('span').remove();
	        	}); 
            
                this.errorInfo.push({name: 'Start Date/End Date', message: 'End Date cannot be the same or earlier than Start Date'});
                return false;
			
			}  else { return true; }
        }	
        return true;
    },
    validateEndDateLastMilestone: function () {
        var lm = $('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').val();
        var ed = $('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').val();
        if (lm !== '' && ed !== '') {
        	var elm = new Date(lm);
			var eed = new Date(ed);
			if(((eed-elm)/1000/60/60/24)!=0) {
			
	        	if($('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').parent().find('span.ms-csrformvalidation').length <=0) {
		        	$('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
		        	var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation datevalidation\"><span role=\"alert\">End Date must be the same as Last Milestone Date<br></span></span>";
		        	$('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').parent().append(errorMessage);
	        	}
	        	
	        	$('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').click( function() {
	        		$('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').css({"border":"", "background-color": ""});
					$('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').parent().find('span').remove();
	        		$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"", "background-color": ""});
					$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').parent().find('span').remove();
	        	});    
			
	        	if($('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').parent().find('span.ms-csrformvalidation').length <=0) {
		        	$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
		        	var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation datevalidation\"><span role=\"alert\">End Date must be the same as Last Milestone Date<br></span></span>";
		        	$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').parent().append(errorMessage);
	        	}
	        	
	        	$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').click( function() {
	        		$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"", "background-color": ""});
					$('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').parent().find('span').remove();
	        		$('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').css({"border":"", "background-color": ""});
					$('input[id^="LastMilestone_"]input[id$="_$DateTimeFieldDate"]').parent().find('span').remove();
	        	}); 
            
                this.errorInfo.push({name: 'End Date/Last Milestone Date', message: 'End Date must be the same as Last Milestone Date'});
                return false;
			
			}  else { return true; }
        }	
        return true;
    },
    validateIOData: function () {
    	$('div.IOGrid-Container').parent().find('span.ms-csrformvalidation').remove();
        var ioData = this.IOGrid.getCurrentGridData();
        var poTotal = $('input[id^="POTotal_"]input[id$="_$CurrencyField"]').val();
        var ioTotal = $('#poTotal').text();
        ioData = JSON.parse(ioData);
        var isValid = true;
        for (var i = 0; i < ioData.length; i++) {
            var ioNum = ioData[i].ponumber;
	        if (ioNum !== '') {
	            if (ioNum.length > 10  &&  ioNum % 1 === 0) {
	            //    ioNumValidationFlag = true;
	            //} else {
	            //	ioNumValidationFlag = false
	            	$('div.IOGrid-Container input.po-number-field').eq(i).css({"border":"1 solid red", "background-color": "#ffdddd"});
		  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Line " + (i + 1) + "  must be a less than or equal to 10 numerical digits IO Number<br></span></span><br id='linebreaker'>";
	  	        	$('div.IOGrid-Container').parent().append(errorMessage);
	  	        	
				
					$('div.IOGrid-Container input.po-number-field').eq(i).keypress( function() {
											
						$(this).css({"border":"1 solid black","background-color":"#ded5e9"});
						$('div.IOGrid-Container').parent().find('span.ms-csrformvalidation').remove();
						$('div.IOGrid-Container').parent().find('br#linebreaker').remove();
					
					});	
	            
	                this.errorInfo.push({name: 'IO Number', message: 'Line ' + (i + 1) + '  must be a less than or equal to 10 numerical digits IO Number'});
	                //return false;
	                isValid = false;
	            }
	        } else if (ioNum === '') {
	            	$('div.IOGrid-Container input.po-number-field').eq(i).css({"border":"1 solid red", "background-color": "#ffdddd"});
		  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Line " + (i + 1) + "  must have an IO Number<br></span></span><br id='linebreaker'>";
	  	        	$('div.IOGrid-Container').parent().append(errorMessage);
	  	        	
				
					$('div.IOGrid-Container input.po-number-field').eq(i).keypress( function() {
											
						$(this).css({"border":"1 solid black","background-color":"#ded5e9"});
						$('div.IOGrid-Container').parent().find('span.ms-csrformvalidation').remove();
						$('div.IOGrid-Container').parent().find('br#linebreaker').remove();
					});	
	        
                this.errorInfo.push({name: 'IO Number', message: 'Line ' + (i + 1) + ' must have an IO Number'});
                //return false;
                isValid = false;
            }
        }
        if (poTotal === ioTotal) {
            //return true;
        } else {
        	$('div.IOGrid-Container input.po-number-field').eq(i).css({"border":"1 solid red", "background-color": "#ffdddd"});
  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">PO Total and IO Total must be the same.<br></span></span><br id='linebreaker'>";
        	$('div.IOGrid-Container').parent().append(errorMessage);
        	
		
			$('div.IOGrid-Container input.po-number-field').eq(i).keypress( function() {
									
				$(this).css({"border":"1 solid black","background-color":"#ded5e9"});
				$('div.IOGrid-Container').parent().find('span.ms-csrformvalidation').remove();
				$('div.IOGrid-Container').parent().find('br#linebreaker').remove();
			});	

            this.errorInfo.push({name: 'PO Total / IO Data', message: 'PO Total and IO Total must be the same.'});
            //return false;
            isValid = false;
        }
        
        if(!isValid) { return false; }
        else { return true; }
    },
    validatePersonalData: function () {
        var inputs = $('#PersonalData').find('input[type="radio"]');
        for (var i = 0; i < inputs.length; i++) {
            var input = $(inputs[i]);           
            if ($(input).is(':checked')) {
                return true;
            }
        }
        
    	$('table[id^="HasPersonalData_"]table[id$="_ChoiceRadioTable"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Personal Data must have a selection<br></span></span>";
        if($('table[id^="HasPersonalData_"]table[id$="_ChoiceRadioTable"]').parent().find('span.ms-csrformvalidation').length <= 0) {
        	$('table[id^="HasPersonalData_"]table[id$="_ChoiceRadioTable"]').parent().append(errorMessage);
        }
		
		$('table[id^="HasPersonalData_"]table[id$="_ChoiceRadioTable"]').click( function() {
			if($('table[id^="HasPersonalData_"]table[id$="_ChoiceRadioTable"]').css("background-color") == "rgb(255, 221, 221)") {
        		$('table[id^="HasPersonalData_"]table[id$="_ChoiceRadioTable"]').css({"border":"", "background-color": ""});
				$('table[id^="HasPersonalData_"]table[id$="_ChoiceRadioTable"]').parent().find('span.ms-csrformvalidation').remove();
			}
		
		});	
    
        this.errorInfo.push({name: 'Personal Data', message: 'Personal Data must have a selection'});
        return false;
    },
    validateConfidentialData: function () {
        var inputs = $('#ConfidentialData').find('input[type="radio"]');
        for (var i = 0; i < inputs.length; i++) {
            var input = $(inputs[i]);
            if ($(input).is(':checked')) {
                return true;
            }
        }
        
    	$('table[id^="HasConfidentialData_"]table[id$="_ChoiceRadioTable"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Confidential Data must have a selection<br></span></span>";
        if($('table[id^="HasConfidentialData_"]table[id$="_ChoiceRadioTable"]').parent().find('span.ms-csrformvalidation').length <= 0) {
        	$('table[id^="HasConfidentialData_"]table[id$="_ChoiceRadioTable"]').parent().append(errorMessage);
        }
		
		$('table[id^="HasConfidentialData_"]table[id$="_ChoiceRadioTable"]').click( function() {
			if($('table[id^="HasConfidentialData_"]table[id$="_ChoiceRadioTable"]').css("background-color") == "rgb(255, 221, 221)") {
        		$('table[id^="HasConfidentialData_"]table[id$="_ChoiceRadioTable"]').css({"border":"", "background-color": ""});
				$('table[id^="HasConfidentialData_"]table[id$="_ChoiceRadioTable"]').parent().find('span.ms-csrformvalidation').remove();
			}
		
		});	
        
        this.errorInfo.push({name: 'Confidential Data', message: 'Confidential Data must have a selection'});
        return false;
    },    
    validateCRSResearchAreas: function () {
        var inputs = $('#csrResearchAreasSection').find('input[type="checkbox"]');
        for (var i = 0; i < inputs.length; i++) {
            var input = $(inputs[i]);
            if ($(input).is(':checked')) {
                return true;
            }
        }
        
        $('#csrResearchAreasSection').find('input[type="checkbox"]').next().css("cssText", "border: 1 solid red; background-color: #ffdddd !important;");
        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">CRS Research Areas must have a selection<br></span></span>";
        if($('#csrResearchAreasSection').find('span.ms-csrformvalidation').length <= 0) {
			$('#csrResearchAreasSection').append(errorMessage);
		}        
        
        $('#csrResearchAreasSection').find('input[type="checkbox"]').next().click( function () {
        	if($(this).css("background-color") == "rgb(255, 221, 221)") {
        		$('#csrResearchAreasSection').find('input[type="checkbox"]').next().css("cssText", "");
				$('#csrResearchAreasSection').find('span.ms-csrformvalidation').remove();
        	}     
        });
        
        
        this.errorInfo.push({name: 'CRS Research Areas', message: 'CRS Research Areas must have a selection'});
        return false;
    },
    validateResearchAreas: function () {
        var inputs = $('#researchAreasSection').find('input[type="checkbox"]');
        for (var i = 0; i <= inputs.length; i++) {
            var input = $(inputs[i]);
            if ($(input).is(':checked')) {
                return true;
            }
        }
        
        $('#researchAreasSection').find('input[type="checkbox"]').next().css("cssText", "border: 1 solid red; background-color: #ffdddd !important;");
        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Research Areas must have a selection<br></span></span>";
        if($('#researchAreasSection').find('span.ms-csrformvalidation').length <= 0) {
			$('#researchAreasSection').append(errorMessage);
		}        
        
        $('#researchAreasSection').find('input[type="checkbox"]').next().click( function () {
        	if($(this).css("background-color") == "rgb(255, 221, 221)") {
        		$('#researchAreasSection').find('input[type="checkbox"]').next().css("cssText", "");
				$('#researchAreasSection').find('span.ms-csrformvalidation').remove();
        	}     
        });
        
        this.errorInfo.push({name: 'Research Areas', message: 'Research Areas must have a selection'});
        return false;
    },
    validateAttachment: function () {
    	var addedFileCount = $('#idAttachmentsTable').find('tr').length;
    	var PDInputs = $('#PersonalData').find('input[type="radio"]');
    	var CDInputs = $('#ConfidentialData').find('input[type="radio"]');
    	var PDValue = "No";
    	var CDValue = "No";
    	
    	for (var i = 0; i < PDInputs.length; i++) {
    		var inputPD = $(PDInputs[i]);
    		if ($(inputPD).is(':checked')) {
    			PDValue = $(inputPD).val();
    		}    	
    	}
    	
    	for (var j = 0; j < CDInputs.length; j++) {
    		var inputCD = $(CDInputs[j]);
    		if ($(inputCD).is(':checked')) {
    			CDValue = $(inputCD).val();
    		}    	
    	}
    	
    	
    	if(addedFileCount <= 0) {
    		$('div#AttachmentBtn').css({"border":"1 solid red", "background-color": "#ffdddd"});
    		var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">SOW/Personal/Confidential Attachment cannot be blank<br></span></span>";
    		console.log($('div.attachment-section').html().indexOf(errorMessage));
    		if($('div.attachment-section').html().indexOf(errorMessage) == -1) {
        		$('div.attachment-section').append(errorMessage);
        	}

        	$('div#AttachmentBtn').click( function() {
        		$('div#AttachmentBtn').css({"border":"1px solid gray", "background-color": ""});
				$('div.attachment-section').find('span.ms-formvalidation').remove();
        	});
        	
            this.errorInfo.push({name: 'SOW/Personal/Confidential Attachment', message: 'SOW/Personal/Confidential Attachment cannot be blank' });
            return false;
    	} else if (PDValue == "Yes" || CDValue == "Yes" ) {
    		if(addedFileCount < 2) {
	    		$('div#AttachmentBtn').css({"border":"1 solid red", "background-color": "#ffdddd"});
	    		var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">SOW/Personal/Confidential Attachment(s) must be at least two documents<br></span></span>";
	    		console.log($('div.attachment-section').html().indexOf(errorMessage));
	    		if($('div.attachment-section').html().indexOf(errorMessage) == -1) {
	        		$('div.attachment-section').append(errorMessage);
	        	}
	
	        	$('div#AttachmentBtn').click( function() {
	        		$('div#AttachmentBtn').css({"border":"1px solid gray", "background-color": ""});
					$('div.attachment-section').find('span.ms-formvalidation').remove();
	        	});
	        	
	            this.errorInfo.push({name: 'SOW/Personal/Confidential Attachment()', message: 'SOW/Personal/Confidential Attachment(s) must be at least two documents' });
	            return false;
    		}
		} else if (PDValue == "No" && CDValue == "No" ) {
        		$('div#AttachmentBtn').css({"border":"1px solid gray", "background-color": ""});
				$('div.attachment-section').find('span.ms-formvalidation').remove();
		}  	
        return true;
    },    
    showValidationErrors: function () {
    	var vendorNumberErrorShown = 0;
        if (this.errorInfo.length > 0) {
            var div = '';
            for (var i = 0; i < this.errorInfo.length; i++) {

            	//don't display the Vendor Number error twice
            	if(this.errorInfo[i].name === "Vendor Number"){
            		vendorNumberErrorShown++;
            	}
            	if(this.errorInfo[i].name === "Vendor Number" && vendorNumberErrorShown > 1){
	                continue;
	            }
	            
	            div += '<div><strong>' + this.errorInfo[i].name + ':</strong>&nbsp;&nbsp;' + this.errorInfo[i].message + '</div>';
            }
            SP.UI.ModalDialog.showErrorDialog('Invalid Submission', div);
        }
    },
  /* isAdmin: function () {
        $.ajax({
            type: 'GET',
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/sitegroups/getByName('cmrpo')/Users?$filter=Id eq " + _spPageContextInfo.userId,
            contentType: 'application/json;odata=verbose',
            headers: {
                'Accept': 'application/json;odata=verbose',
                'X-RequestDigest': $('#__REQUESTDIGEST').val()
            },
            success:function (response) {
                var result = response.d.results;
                if (result.length > 0) {
                    $('#AdminSection').show();
                }
            },
            error: function (err) {
                console.log(err);
            }

        });
    }*/
    isAdmin: function () {
        $().SPServices({
		   operation: "GetGroupCollectionFromUser",
		   userLoginName: $().SPServices.SPGetCurrentUser(),
		   async: false,
		   completefunc: function(xData, Status) {
			 if($(xData.responseXML).find("Group[Name='CMRPO']").length == 1)
			  {
			   if(window.location.href.indexOf('PurchaseOrders/DispForm.aspx')>-1 || window.location.href.indexOf('PurchaseOrders/EditForm.aspx')>-1 )
			     $('#AdminSection').show();
			     			     
			   if(window.location.href.indexOf('PurchaseOrders/newform.aspx')>-1)
			     $('#AdminSection').hide();
			  }
			  else
			    $('#AdminSection').hide();
			 }
		}); 
    }

};

function commafyNum(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function decommafyNum(num) {
	return num.replace(/,/g , "");
}

function ChangeOrderForm() {
    this.formType = this.getFormType();
    this.IOGrid = new IOGrid(this.formType);
    this.buildFormFields();
    $('#s4-ribbonrow').hide();
    $('title').text('Change Orders - New Item');
    //this.initializeDatePicker($('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]'));
    //this.initializeDatePicker($('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]'));
    this.errorInfo = [];
    $('#submitBtn').click(this.submitForm.bind(this));
    $('#cancelBtn').click(function () {window.location.href = 'https://microsoft.sharepoint.com/teams/cmrcentral/cmr-business-operations/Pages/POCOHomePage.aspx';}.bind(this));
    this.isAdmin();
    $('span[class="die"]').text('Change Order Request');
    $('.uploadLbl').text('Upload CO');
    var increase = $('#ReasonForChangeOrder0Container input').is(':checked');
    if (!increase) {
    	$('.conditional-hide').hide();
    }
    
    $('#ReasonForChangeOrder0Container input').change(this.toggleHiddenFields.bind(this));
    
    $('#ReasonForChangeOrder1Container input').change(
    	function(){
    		flexToggle($('#scopeChangeNotesContainer'));
    });
    
}
ChangeOrderForm.prototype = {
    constructor: ChangeOrderForm,
    buildFormFields: function () {
        if (this.formType.mode === 'newform.aspx' || this.formType.mode === 'editform.aspx') {
            var RequestorAlias = $('div[id^="RequestorAlias_"]div[id$="_$ClientPeoplePicker"]').detach();
            $('#RequestorAlias').append(RequestorAlias);
            var Cc = $('input[id^="EmailCC_"]input[id$="_$TextField"]').detach();
            Cc.attr('placeholder', 'Enter the full email addresses of individuals who need to follow the progress of this request...');
            $('#Cc').append(Cc);
            var PONumber = $('input[id^="PONumber_"]input[id$="_$TextField"]').detach();
            PONumber.attr('placeholder', 'Enter the PO Number...');
            $('#PONumber').append(PONumber);
            var POOwner = $('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').detach();
            $('#POOwner').append(POOwner);
            $('#POOwner').find('span[id^="POOwner"]span[id$="ClientPeoplePicker_InitialHelpText"]').text('Enter the name or email address of the person who will own this PO extension...');
            var SAFEApprover = $('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').detach();
            $('#SAFEApprover').append(SAFEApprover);
            var InterimApprover = $('div[id^="InterimPOApprovers_"]div[id$="_$ClientPeoplePicker"]').detach();
            $('#InterimPOApprovers').append(InterimApprover);
            $('#InterimPOApprovers').find('span[id^="InterimPOApprovers"]span[id$="ClientPeoplePicker_InitialHelpText"]').text('Enter the names or email addresses of other people who need to approve this PO...');
            var InvoiceApprover = $('div[id^="InvoiceApprover_"]div[id$="_$ClientPeoplePicker"]').detach();
            $('#InvoiceApprover').append(InvoiceApprover);
            $('#InvoiceApprover').find('span[id^="InvoiceApprover"]span[id$="ClientPeoplePicker_InitialHelpText"]').text('Enter a name or email address...');
            var StatusChange = $('select[id^="StatusChange_"]select[id$="_$DropDownChoice"]').detach();
            $('#StatusChange').append(StatusChange);
            var ReasonForChangeOrder0 = $('input[id^="ReasonForChangeOrder_"]input[id$="_MultiChoiceOption_0"]').detach();
            $('#ReasonForChangeOrder0Container').append(ReasonForChangeOrder0);
            $('#ReasonForChangeOrder0Container').append($('<div />', {'class': 'control__indicator'}));
            $('#ReasonForChangeOrder0Label').text($('label[for^="ReasonForChangeOrder_"]label[for$="_MultiChoiceOption_0"]').text());
            
            var ReasonForChangeOrder1 = $('input[id^="ReasonForChangeOrder_"]input[id$="_MultiChoiceOption_1"]').detach();
            $('#ReasonForChangeOrder1Container').append(ReasonForChangeOrder1);
            $('#ReasonForChangeOrder1Container').append($('<div />', {'class': 'control__indicator'}));
            $('#ReasonForChangeOrder1Label').text($('label[for^="ReasonForChangeOrder_"]label[for$="_MultiChoiceOption_1"]').text());
            var ReasonForChangeOrder2 = $('input[id^="ReasonForChangeOrder_"]input[id$="_MultiChoiceOption_2"]').detach();
            $('#ReasonForChangeOrder2Container').append(ReasonForChangeOrder2);
            $('#ReasonForChangeOrder2Container').append($('<div />', {'class': 'control__indicator'}));
            $('#ReasonForChangeOrder2Label').text($('label[for^="ReasonForChangeOrder_"]label[for$="_MultiChoiceOption_2"]').text());
            
            $('#researchGDPRSection').hide();
            ////////////////////////////////////////////////
            ///    Hide personal and confidential data section
            ////////////////////////////////////////////////
            /*
            var PersonalData = $('table[id^="HasPersonalData_"]table[id$="_ChoiceRadioTable"]').detach();
            $('#PersonalData').append(PersonalData);
            var PersonalData = $('table[id^="HasConfidentialData_"]table[id$="_ChoiceRadioTable"]').detach();
            $('#ConfidentialData').append(PersonalData);
            var PersonalData = $('table[id^="HasPDorCDScopeChange_"]table[id$="_ChoiceRadioTable"]').detach();
            $('#COChangeScope').append(PersonalData);
            */

            
            /*var StartDate1 = $('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').detach();
            StartDate1.attr('placeholder', '00 / 00/ 00');
            $('#StartDate1').append(StartDate1);*/
            /*var EndDate1 = $('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').detach();
            EndDate1.attr('placeholder', '00 / 00/ 00');
            $('#EndDate1').append(EndDate1);*/
            /*var ChangeType = $('select[id^="ChangeType_"]select[id$="_$DropDownChoice"]').detach();
            $('#ChangeType').append(ChangeType);*/
            var ScopeChangeNotes = $('div[id="ScopeChangeNotes_a51d0579-6a30-4542-9caa-013dbcdb9833_\\$TextField_topDiv"]').detach();
            $('#ScopeChangeNotes').append(ScopeChangeNotes);
            
            var ChangeOrderNotes = $('div[id^="ChangeOrderNotes_"]div[id$="_$TextField_topDiv"]').detach();
            $('#ChangeOrderNotes').append(ChangeOrderNotes);
            $('#ChangeOrderNotes').append($('input[id^="ChangeOrderNotes_"]input[id$="TextField_spSave"]').closest('td').detach());
            
            var AttachedFiles = $('#idAttachmentsTable').detach();
            $('.attachment-section').append(AttachedFiles);

            $('div#AttachmentBtn').click(function(){
            	
				let addedFileCount = $('#idAttachmentsTable').find('tr').length;					
				let fileUploadCount = $('input[name^="fileupload"]').length;	
				let tbodyCount  =$('#idAttachmentsTable').find('tbody').length;
				console.log("AddedFiledCount: " + addedFileCount);
				console.log("fileUploadCount : " + fileUploadCount);
				console.log("tbodyCount : " + tbodyCount);
				
				//bind the change event handller for the new browse attachment control and 
				//trigger the OK button after the change
				$($('input[name^="fileupload"]')[fileUploadCount - 1]).change(function() {
					//if(tbodyCount !==  0) {
						$('#attachOKbutton').trigger("click");
					//}
				});
				$($('input[name^="fileupload"]')[fileUploadCount - 1]).trigger("click");			
            });
            
            /*
            var AttachedFiles = $('#idAttachmentsTable').detach();
            //$('.attachment-section').append(UploadAttach);
            $('.attachment-section').append(AttachedFiles);

            $('div#AttachmentBtn').click(function(){
            	
				var addedFileCount = $('#idAttachmentsTable').find('tr').length;	
				//console.log("AddedFiledCount: " + addedFileCount);
				var fileUploadCount = $('input[name^="fileupload"]').length;	
				//console.log("fileUploadCount : " + fileUploadCount);
				var tbodyCount  =$('#idAttachmentsTable').find('tbody').length;
				//console.log("tbodyCount : " + tbodyCount);

				
				$($('input[name^="fileupload"]')[fileUploadCount - 1]).trigger("click");
				if(fileUploadCount >= 1) { // || tbodyCount !==  0) {
					$('#attachOKbutton').trigger("click");	
					//console.log("Okay");				
				}				
            });
            */
                        
            /*
            var UploadSOW = $('#onetidIOFile').detach();
            UploadSOW.change(this.attachmentChanged.bind(this));
            var atts = $('#idAttachmentsTable').detach();
            $('#UploadSOW').append(UploadSOW);
            $('#UploadSOW').append(atts);
            */
            
            var AdditionalAdminNotes = $('div[id^="AdminNotes_"]div[id$="_$TextField_topDiv"]').detach();
            $('#CoAdminNotesContainer').append(AdditionalAdminNotes);
            $('#CoAdminNotesContainer').append($('input[id^="AdminNotes_"]input[id$="TextField_spSave"]').closest('td').detach());
                //Added for CO status
            var ChangeStatus = $('select[id^="ChangeStatus_"]select[id$="_$DropDownChoice"]').detach();
            $('#CoStatusChange').append(ChangeStatus);
             var CONumber = $('input[id^="CONumber_"]input[id$="_$TextField"]').detach();
            $('#CoNumber').append(CONumber);
            this.IOGrid.setData(this.getIOData());
        } else if (this.formType.mode === 'dispform.aspx') {
            $('#submitBtn').hide();
            $('.checkbox-container').hide();
            $('#addNewRowContainer').hide();
            var table = $('.ms-formtable');
            var rows = table.find('tr');
            for (var i = 0; i < rows.length; i++) {
                var row = $(rows[i]);
                var name = row.find('a').attr('name');
                if (typeof name !== 'undefined') {
                    name = name.substring(11);
                } else {
                    continue;
                }
                var value = row.find('.ms-formbody');
                if (value.find('div').length > 0) {
                    value = value.find('div').text().trim();
                } else {
                    value = value.text().trim();
                }
                if (name === 'IOData') {
                    this.IOGrid.setData(JSON.parse(value));
                    $('.io-grid-input').attr('readonly', true);
                    $('.delete-img').hide();
                } else if (name === 'Attachments') {
                    var attDiv = $('<div />').append(row.find('.ms-formbody').find('table'));
                    $('#UploadSOW').append(attDiv);
                    $('#UploadSOW').parent().css({'justify-content': 'flex-start'})
                } else if (name === 'ReasonForChangeOrder') {
                    var values = value.split(';');
                    for (var j = 0; j < values.length; j++) {
                        $('#ReasonForChangeOrder').append($('<div />', {text: values[j]}));
                    }
                } else if (name === 'HasPersonalData') {
                	$('span.GDPRsupport').css('display','none');
                	if(value === 'Yes') {
                		$('#PersonalData').append($('<input />', {'class': 'disp-form-field', type: 'text', value: value, 'readonly': true}));
                	} else {
                		$('#PersonalData').append($('<input />', {'class': 'disp-form-field', type: 'text', value: 'No', 'readonly': true}));
                	}
                } else if (name === 'HasConfidentialData') {
                	$('span.GDPRsupport').css('display','none');
                	if(value === 'Yes') {
                		$('#ConfidentialData').append($('<input />', {'class': 'disp-form-field', type: 'text', value: value, 'readonly': true}));
                	} else {
                		$('#ConfidentialData').append($('<input />', {'class': 'disp-form-field', type: 'text', value: 'No', 'readonly': true}));
                	}
                } else if (name === 'HasPDorCDScopeChange') {
                	$('span.GDPRsupport').css('display','none');
                	if(value === 'Yes') {
                		$('#COChangeScope').append($('<input />', {'class': 'disp-form-field', type: 'text', value: value, 'readonly': true}));
                	} else {
                		$('#COChangeScope').append($('<input />', {'class': 'disp-form-field', type: 'text', value: 'No', 'readonly': true}));
                	}
                } else if (name === 'ChangeOrderNotes') {
                    var coNoteDiv = row.find('.ms-formbody').detach();
                    $('#ChangeOrderNotes').append(coNoteDiv);
                } else if (name === 'AdminNotes') {
                    var adminNoteDiv = row.find('.ms-formbody').detach();
                    $('#CoAdminNotesContainer').append(adminNoteDiv);
                } else if (name === 'ChangeStatus') {
                	$('#CoStatusChange').append($('<input />', {'class': 'disp-form-field', type: 'text', value: value, 'readonly': true}));
                } else if (name === 'CONumber') {
                	$('#CoNumber').append($('<input />', {'class': 'disp-form-field', type: 'text', value: value, 'readonly': true}));
                } else {
                    name = name === 'EmailCC' ? 'Cc' : name;
                    $('#' + name).append($('<input />', {'class': 'disp-form-field', type: 'text', value: value, 'readonly': true}));
                }

            }
        }
    },
    getFormType: function () {
        var url = _spPageContextInfo.serverRequestPath;
        var type = url.substring(url.lastIndexOf('/') + 1);
        return {mode: type.toLowerCase(), name: 'Change Order'};
    },
    getIOData: function () {
        var data = $('textarea[id^="IOData_"]textarea[id$="_$TextField"]').val();
        try {
            if (data !== '') {
                var parsed = JSON.parse(data);
                return parsed;
            } else {
                return [];
            }
        } catch (e) {
            return [];
        }
        return [];
    },
    initializeDatePicker: function (jqEl) {
        if (jqEl) {
            jqEl.focus(function (e) {
                if (!$(e.currentTarget).hasClass('hasDatepicker')) {
                	console.log("fire");
                    jqEl.datepicker();
                }
            }.bind(this));
        }
        $('link[href="https://ajax.aspnetcdn.com/ajax/jquery.ui/1.10.4/themes/le-frog/jquery-ui.css"]').remove();
    },
    toggleHiddenFields: function () {
    	var increase = $('#ReasonForChangeOrder0Container input').is(':checked');
    	if (increase === true) {
    		$('.conditional-hide').show();
    	} else {
    		$('.conditional-hide').hide();
    	}
    },
    validateForm: function () {
        this.errorInfo = [];
        this.validateRequestorAlias();
        //this.validateStatusChange();
        this.validateReasonForChangeOrder();
        this.validateIOData();
        //this.validatePersonalData();
		//this.validateConfidentialData();
		//this.validateChangeScopePDCD();
        //this.validateStartDate();
        //this.validateEndDate();
        //this.validatePOOwner();
        //this.validateInvoiceApprover();
        this.validatePOOwnerSAFEApprover();
        this.validateSAFEApprover();        
        this.validateCc();
        this.validatePONumber();
        this.validateScopeChangeNotes();
        this.validateAttachment();
    },
    validateScopeChangeNotes: function () {
    	if($("#ScopeChangeNotes").is(":visible")){
   	    	var scn =   $('#ScopeChangeNotes_a51d0579-6a30-4542-9caa-013dbcdb9833_\\$TextField_topDiv')[0].innerText;
   	    	
   	    	//For IE
   	    	if(scn.indexOf("Rich text editor") > -1) {
   	    		scn = scn.replace("Rich text editor ScopeChangeNotes\r\n\r\n\r\n", "");
   	    	}
   	    	
   	    	scn = scn.trim();
   	    	scn = scn.replace(/ /g,'');
   	    	if (typeof scn === 'undefined' || scn === '[]' || /\w/g.test(scn) == false ) {
   	    	
	        	$('div[id^="ScopeChangeNotes_"]div[id$="_$TextField_topDiv"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
	  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Scope Change Notes are required<br></span></span>";
	  	        if($('div[id^="ScopeChangeNotes_"]div[id$="_$TextField_topDiv"]').parent().find('span.ms-csrformvalidation').length <= 0) {
	  	        	$('div[id^="ScopeChangeNotes_"]div[id$="_$TextField_topDiv"]').parent().append(errorMessage);
	  	        }
				
				$('div[id^="ScopeChangeNotes_"]div[id$="_$TextField_topDiv"]').keypress( function() {
					if($('div[id^="ScopeChangeNotes_"]div[id$="_$TextField_topDiv"]').css("background-color") == "rgb(255, 221, 221)") {
		        		$('div[id^="ScopeChangeNotes_"]div[id$="_$TextField_topDiv"]').css({"border":"", "background-color": ""});
						$('div[id^="ScopeChangeNotes_"]div[id$="_$TextField_topDiv"]').parent().find('span.ms-csrformvalidation').remove();
					}
				
				});	   	 
				   	
	            this.errorInfo.push({name: 'Change in Project Scope Notes', message: 'Scope Change Notes are required'});
	            return false
	        }
	    }
        return true;
    },
    validateRequestorAlias: function () {
    	var ra =   $('input[id^="RequestorAlias_"]input[id$="_$ClientPeoplePicker_HiddenInput"]').attr('value');
        if (typeof ra === 'undefined' || ra === '[]' || ra === '') {
        
        	$('div[id^="RequestorAlias_"]div[id$="_$ClientPeoplePicker"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Requestor Alias cannot be blank<br></span></span>";
  	        if($('div[id^="RequestorAlias_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').length <= 0) {
  	        	$('div[id^="RequestorAlias_"]div[id$="_$ClientPeoplePicker"]').parent().append(errorMessage);
  	        	$('div[id^="RequestorAlias_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "50px");

  	        }
			
			$('div[id^="RequestorAlias_"]div[id$="_$ClientPeoplePicker"]').keypress( function() {
				if($('div[id^="RequestorAlias_"]div[id$="_$ClientPeoplePicker"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('div[id^="RequestorAlias_"]div[id$="_$ClientPeoplePicker"]').css({"border":"", "background-color": ""});
					$('div[id^="RequestorAlias_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').remove();
					$('div[id^="RequestorAlias_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "20px");

				}
			
			});				        
                
            this.errorInfo.push({name: 'Requestor Alias', message: 'Requestor Alias cannot be blank'});
            return false
        }
        return true;
    },
    validateStatusChange: function () {
        var val = $('select[id^="StatusChange_"]select[id$="_$DropDownChoice"]').val();
        if (val === '') {
        
        	$('select[id^="StatusChange_"]select[id$="DropDownChoice"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Status Change cannot be blank<br></span></span>";
  	        if($('select[id^="StatusChange_"]select[id$="DropDownChoice"]').parent().find('span.ms-csrformvalidation').length <= 0) {
  	        	$('select[id^="StatusChange_"]select[id$="DropDownChoice"]').parent().append(errorMessage);
  	        }
			
			$('select[id^="StatusChange_"]select[id$="DropDownChoice"]').click( function() {
				if($('select[id^="StatusChange_"]select[id$="DropDownChoice"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('select[id^="StatusChange_"]select[id$="DropDownChoice"]').css({"border":"", "background-color": ""});
					$('select[id^="StatusChange_"]select[id$="DropDownChoice"]').parent().find('span.ms-csrformvalidation').remove();
				}
			
			});	
			        
            this.errorInfo.push({name: 'Status Change', message: 'Status Change cannot be blank'});
            return false;
        } else {
            return true;
        }
    },
    validateReasonForChangeOrder: function () {
        var choice0 = $('input[id^="ReasonForChangeOrder_"]input[id$="_MultiChoiceOption_0"]').is(':checked');
        var choice1 = $('input[id^="ReasonForChangeOrder_"]input[id$="_MultiChoiceOption_1"]').is(':checked');
        var choice2 = $('input[id^="ReasonForChangeOrder_"]input[id$="_MultiChoiceOption_2"]').is(':checked');
        if (choice0 === false && choice1 === false && choice2 === false) {
        
	        $('#ReasonForChangeOrder').find('input[type="checkbox"]').next().css("cssText", "border: 1 solid red; background-color: #ffdddd !important;");
	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">You must select at least one option from Reason for Change Order<br></span></span>";
	        if($('#ReasonForChangeOrder').find('span.ms-csrformvalidation').length <= 0) {
				$('#ReasonForChangeOrder').append(errorMessage);
			}        
	        
	        $('#ReasonForChangeOrder').find('input[type="checkbox"]').next().click( function () {
	        	if($(this).css("background-color") == "rgb(255, 221, 221)") {
	        		$('#ReasonForChangeOrder').find('input[type="checkbox"]').next().css("cssText", "");
					$('#ReasonForChangeOrder').find('span.ms-csrformvalidation').remove();
	        	}     
	        });
                
            this.errorInfo.push({name: 'Reason for Change Order', message: 'You must select at least one option from Reason for Change Order'});
            return false;
        } else {
            return true;
        }
    },
    validatePersonalData: function () {
        var inputs = $('#PersonalData').find('input[type="radio"]');
        for (var i = 0; i < inputs.length; i++) {
            var input = $(inputs[i]);
            if ($(input).is(':checked')) {
                return true;
            }
        }
        
    	$('table[id^="HasPersonalData_"]table[id$="_ChoiceRadioTable"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Personal Data must have a selection<br></span></span>";
        if($('table[id^="HasPersonalData_"]table[id$="_ChoiceRadioTable"]').parent().find('span.ms-csrformvalidation').length <= 0) {
        	$('table[id^="HasPersonalData_"]table[id$="_ChoiceRadioTable"]').parent().append(errorMessage);
        }
		
		$('table[id^="HasPersonalData_"]table[id$="_ChoiceRadioTable"]').click( function() {
			if($('table[id^="HasPersonalData_"]table[id$="_ChoiceRadioTable"]').css("background-color") == "rgb(255, 221, 221)") {
        		$('table[id^="HasPersonalData_"]table[id$="_ChoiceRadioTable"]').css({"border":"", "background-color": ""});
				$('table[id^="HasPersonalData_"]table[id$="_ChoiceRadioTable"]').parent().find('span.ms-csrformvalidation').remove();
			}
		
		});	
		        
        this.errorInfo.push({name: 'Personal Data', message: 'Personal Data must have a selection'});
        return false;
    },
    validateConfidentialData: function () {
        var inputs =$('#ConfidentialData').find('input[type="radio"]');
        for (var i = 0; i < inputs.length; i++) {
            var input = $(inputs[i]);
            if ($(input).is(':checked')) {
                return true;
            }
        }
        
    	$('table[id^="HasConfidentialData_"]table[id$="_ChoiceRadioTable"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Confidential Data must have a selection<br></span></span>";
        if($('table[id^="HasConfidentialData_"]table[id$="_ChoiceRadioTable"]').parent().find('span.ms-csrformvalidation').length <= 0) {
        	$('table[id^="HasConfidentialData_"]table[id$="_ChoiceRadioTable"]').parent().append(errorMessage);
        }
		
		$('table[id^="HasConfidentialData_"]table[id$="_ChoiceRadioTable"]').click( function() {
			if($('table[id^="HasConfidentialData_"]table[id$="_ChoiceRadioTable"]').css("background-color") == "rgb(255, 221, 221)") {
        		$('table[id^="HasConfidentialData_"]table[id$="_ChoiceRadioTable"]').css({"border":"", "background-color": ""});
				$('table[id^="HasConfidentialData_"]table[id$="_ChoiceRadioTable"]').parent().find('span.ms-csrformvalidation').remove();
			}
		
		});     
		   
        this.errorInfo.push({name: 'Confidential Data', message: 'Confidential Data must have a selection'});
        return false;
    }, 
    validateChangeScopePDCD: function () {
        var inputs = $('#COChangeScope').find('input[type="radio"]');
        for (var i = 0; i < inputs.length; i++) {
            var input = $(inputs[i]);
            if ($(input).is(':checked')) {
                return true;
            }
        }
        
    	$('table[id^="HasPDorCDScopeChange_"]table[id$="_ChoiceRadioTable"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Change scope must have a selection<br></span></span>";
        if($('table[id^="HasPDorCDScopeChange_"]table[id$="_ChoiceRadioTable"]').parent().find('span.ms-csrformvalidation').length <= 0) {
        	$('table[id^="HasPDorCDScopeChange_"]table[id$="_ChoiceRadioTable"]').parent().append(errorMessage);
        }
		
		$('table[id^="HasPDorCDScopeChange_"]table[id$="_ChoiceRadioTable"]').click( function() {
			if($('table[id^="HasPDorCDScopeChange_"]table[id$="_ChoiceRadioTable"]').css("background-color") == "rgb(255, 221, 221)") {
        		$('table[id^="HasPDorCDScopeChange_"]table[id$="_ChoiceRadioTable"]').css({"border":"", "background-color": ""});
				$('table[id^="HasPDorCDScopeChange_"]table[id$="_ChoiceRadioTable"]').parent().find('span.ms-csrformvalidation').remove();
			}
		
		});    
		        
        this.errorInfo.push({name: 'Change scope of Personal or Confidential Data', message: 'Change scope must have a selection'});
        return false;
    },        
    
     validateIOData: function () {
        var ioData = this.IOGrid.getCurrentGridData();
        var choice0 = $('input[id^="ReasonForChangeOrder_"]input[id$="_MultiChoiceOption_0"]').is(':checked');
       // var poTotal = $('input[id^="POTotal_"]input[id$="_$CurrencyField"]').val();
        //var ioTotal = $('#poTotal').text();
        ioData = JSON.parse(ioData);
        var isValid = true;
        for (var i = 0; i < ioData.length; i++) {
            var ioNum = ioData[i].ponumber;
            if (ioNum !== '' && choice0 === true) {
            
	            if (ioNum.length > 10  &&  ioNum % 1 === 0) {
	            	$('div.IOGrid-Container input.po-number-field').eq(i).css({"border":"1 solid red", "background-color": "#ffdddd"});
		  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Line " + (i + 1) + "  must be a less than or equal to 10 numerical digits IO Number<br></span></span><br id='linebreaker'>";
	  	        	$('div.IOGrid-Container').parent().append(errorMessage);
	  	        	
				
					$('div.IOGrid-Container input.po-number-field').eq(i).keypress( function() {
											
						$(this).css({"border":"1 solid black","background-color":"#ded5e9"});
						$('div.IOGrid-Container').parent().find('span.ms-csrformvalidation').remove();
						$('div.IOGrid-Container').parent().find('br#linebreaker').remove();
					
					});	
	            
	                this.errorInfo.push({name: 'IO Number', message: 'Line ' + (i + 1) + '  must be a less than or equal to 10 numerical digits IO Number'});
	                isValid = false;
	            }
            } else if (ioNum === '' && choice0 === true) {
	            	$('div.IOGrid-Container input.po-number-field').eq(i).css({"border":"1 solid red", "background-color": "#ffdddd"});
		  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Line " + (i + 1) + "  must have an IO Number<br></span></span><br id='linebreaker'>";
	  	        	$('div.IOGrid-Container').parent().append(errorMessage);
	  	        	
				
					$('div.IOGrid-Container input.po-number-field').eq(i).keypress( function() {
											
						$(this).css({"border":"1 solid black","background-color":"#ded5e9"});
						$('div.IOGrid-Container').parent().find('span.ms-csrformvalidation').remove();
						$('div.IOGrid-Container').parent().find('br#linebreaker').remove();
					});	
		        
	                this.errorInfo.push({name: 'IO Number', message: 'Line ' + (i + 1) + ' must have an IO Number'});
	                //return false;
	                isValid = false;
	        }
	    }
      
        if(!isValid) { return false; }
        else { return true; }
	},

    validateStartDate: function () {
        var val = $('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').val();
        if (val === '') {
        
        	$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
        	var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation datevalidation\"><span role=\"alert\">Start Date cannot be blank<br></span></span>";
        	if($('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').parent().find('span.ms-csrformvalidation').length <=0) {
        		$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').parent().append(errorMessage);
        	}
        	
        	$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').click( function() {
        		$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"", "background-color": ""});
				$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').parent().find('span').remove();
        	});    
        	        
            this.errorInfo.push({name: 'Start Date', message: 'Start Date cannot be blank'});
            return false;
        } else {
            var regex = new RegExp(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
            if (regex.test(val) === true) {
                return true;
            } else {
            
	        	$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
	        	var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation datevalidation\"><span role=\"alert\">Start Date must be in the format of MM/DD/YYYY<br></span></span>";
	        	if($('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').parent().find('span.ms-csrformvalidation').length <=0) {
	        		$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').parent().append(errorMessage);
	        	}
	        	
	        	$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').click( function() {
	        		$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').css({"border":"", "background-color": ""});
					$('input[id^="StartDate1_"]input[id$="_$DateTimeFieldDate"]').parent().find('span.ms-csrformvalidation').remove();
	        	});    
            
                this.errorInfo.push({name: 'Start Date', message: 'Start Date must be in the format of MM/DD/YYYY'});
                return false;
            }
        }
    },
    validateEndDate: function () {
        var val = $('input[id^="EndDate1_"]input[id$="_$DateTimeFieldDate"]').val();
        if (val === '') {
            this.errorInfo.push({name: 'End Date', message: 'End Date cannot be blank'});
            return false;
        } else {
            var regex = new RegExp(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
            if (regex.test(val) === true) {
                return true;
            } else {
                this.errorInfo.push({name: 'End Date', message: 'End Date must be in the format of MM/DD/YYYY'});
                return false;
            }
        }
    },
    validateCc: function () {
        var cc = $('input[id^="EmailCC_"]input[id$="_$TextField"]').val();
        if (cc !== '') {
            var regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            if (cc.endsWith(';')) {
                cc = cc.substring(0, cc.lastIndexOf(';'))
                $('input[id^="EmailCC_"]input[id$="_$TextField"]').val(cc);
            }
            var emails = cc.split(';');
            for (var i = 0; i < emails.length; i++) {
                var result = regex.test(emails[i].trim());
                if (result === false) {
                    this.errorInfo.push({name: 'CC', message: 'CC must be a semi-colon delimited list of emails \n Example: user@contoso.com; user2@constoso.com'});
                    return false;
                }
            }
            return true;
        }

        return true;
    },
    validatePONumber: function () {
        var val = $('input[id^="PONumber_"]input[id$="_$TextField"]').val();
        if (val === '') {
        
        	$('input[id^="PONumber_"]input[id$="_$TextField"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">PO Number cannot be blank<br></span></span>";
  	        if($('input[id^="PONumber_"]input[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').length <= 0) {
  	        	$('input[id^="PONumber_"]input[id$="_$TextField"]').parent().append(errorMessage);
  	        }
			
			$('input[id^="PONumber_"]input[id$="_$TextField"]').keypress( function() {
				if($('input[id^="PONumber_"]input[id$="_$TextField"]').css("background-color") == "rgb(255, 221, 221)") {
	        		$('input[id^="PONumber_"]input[id$="_$TextField"]').css({"border":"", "background-color": ""});
					$('input[id^="PONumber_"]input[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').remove();
				}
			
			});	         
            this.errorInfo.push({name: 'PO Number', message: 'PO Number cannot be blank'});
            return false;
        } else {
            try {
                if (val.toString().length !== 8) {
                
		        	$('input[id^="PONumber_"]input[id$="_$TextField"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
		  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">PO Number must be 8 digits in length<br></span></span>";
		  	        if($('input[id^="PONumber_"]input[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').length <= 0) {
		  	        	$('input[id^="PONumber_"]input[id$="_$TextField"]').parent().append(errorMessage);
		  	        }
					
					$('input[id^="PONumber_"]input[id$="_$TextField"]').keypress( function() {
						if($('input[id^="PONumber_"]input[id$="_$TextField"]').css("background-color") == "rgb(255, 221, 221)") {
			        		$('input[id^="PONumber_"]input[id$="_$TextField"]').css({"border":"", "background-color": ""});
							$('input[id^="PONumber_"]input[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').remove();
						}
					
					});	  
					              
                    this.errorInfo.push({name: 'PO Number', message: 'PO Number must be 8 digits in length'});
                    return false;
                }
                var isNum = +val;
                if (isNum.toString() === 'NaN') {
                    throw Error();
                }
            } catch(e) {
            
	        	$('input[id^="PONumber_"]input[id$="_$TextField"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
	  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">PO Number must be a 8 digit number with no special characters<br></span></span>";
	  	        if($('input[id^="PONumber_"]input[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').length <= 0) {
	  	        	$('input[id^="PONumber_"]input[id$="_$TextField"]').parent().append(errorMessage);
	  	        }
				
				$('input[id^="PONumber_"]input[id$="_$TextField"]').keypress( function() {
					if($('input[id^="PONumber_"]input[id$="_$TextField"]').css("background-color") == "rgb(255, 221, 221)") {
		        		$('input[id^="PONumber_"]input[id$="_$TextField"]').css({"border":"", "background-color": ""});
						$('input[id^="PONumber_"]input[id$="_$TextField"]').parent().find('span.ms-csrformvalidation').remove();
					}
				
				});	            
                this.errorInfo.push({name: 'PONumber', message: 'PO Number must be a 8 digit number with no special characters'});
                return false;
            }
        }
        return true;
    },
    validatePOOwner: function () {
        var poOwner =   $('input[id^="POOwner_"]input[id$="_$ClientPeoplePicker_HiddenInput"]').attr('value');
        if (typeof poOwner === 'undefined' || poOwner === '[]' || poOwner === '') {
            this.errorInfo.push({name: 'PO Owner', message: 'PO Owner cannot be blank'});
            return false
        }
        return true;
    },
    validateSAFEApprover: function () {
    	if($('input[id^="ReasonForChangeOrder_"]input[id$="_MultiChoiceOption_0"]').is(':checked')) {
	        var pp = $('input[id^="SAFEApprover_"]input[id$="_$ClientPeoplePicker_EditorInput"]').attr('aria-label');
	        if (typeof pp === 'undefined' || pp === '') {
	        
	        	$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
	  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">SAFE Approver cannot be blank<br></span></span>";
	  	        if($('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').length <= 0) {
	  	        	$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().append(errorMessage);
	  	        	$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "50px");
	
	  	        }
				
				$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').keypress( function() {
					if($('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').css("background-color") == "rgb(255, 221, 221)") {
		        		$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').css({"border":"", "background-color": ""});
						$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').remove();
						$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "20px");
	
					}
				
				});	
	        
	            this.errorInfo.push({name: 'SAFE Approver', message: 'SAFE Approver cannot be blank'});
	            return false;
	        }
	        return true;
        }
        return true;
    },
    validatePOOwnerSAFEApprover: function () {
    	if($('input[id^="ReasonForChangeOrder_"]input[id$="_MultiChoiceOption_0"]').is(':checked')) {
    	
	        var poOwner = $('input[id^="POOwner_"]input[id$="_$ClientPeoplePicker_EditorInput"]').attr('aria-label');
	        var safeApprover = $('input[id^="SAFEApprover_"]input[id$="_$ClientPeoplePicker_EditorInput"]').attr('aria-label');
	        
	        var poOwnerResolved = $('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').find('span.sp-peoplepicker-userSpan').attr('sid');
	        var safeApproverResolved = $('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').find('span.sp-peoplepicker-userSpan').attr('sid');
			
	        
	        if (typeof safeApprover !== 'undefined' && safeApprover !== '')  {
	        	if(poOwnerResolved == safeApproverResolved) {
	        	
					$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
					var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">PO Owner and SAFE Approver cannot be the same<br></span></span>";
					if($('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').length <= 0) {
						$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().append(errorMessage);
						$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "50px");
		
					}
					
					$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').keypress( function() {
						if($('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').css("background-color") == "rgb(255, 221, 221)") {
							$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').css({"border":"", "background-color": ""});
							$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').remove();
							$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "20px");
						}
						if($('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').css("background-color") == "rgb(255, 221, 221)") {
							$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').css({"border":"", "background-color": ""});
							$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').remove();
							$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "20px");
						}
					
					});	
				
					this.errorInfo.push({name: 'SAFE Approver', message: 'PO Owner and SAFE Approver cannot be the same'});
					
					$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
					var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">PO Owner and SAFE Approver cannot be the same<br></span></span>";
					if($('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').length <= 0) {
						$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').parent().append(errorMessage);
						$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "50px");
		
					}
					
					$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').keypress( function() {
						if($('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').css("background-color") == "rgb(255, 221, 221)") {
							$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').css({"border":"", "background-color": ""});
							$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').remove();
							$('div[id^="POOwner_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "20px");
						}
						if($('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').css("background-color") == "rgb(255, 221, 221)") {
							$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').css({"border":"", "background-color": ""});
							$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').remove();
							$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "20px");
						}							
					});	
							
					this.errorInfo.push({name: 'PO Owner', message: 'PO Owner and SAFE Approver cannot be the same'});	            
					return false;
				}
			} return true;
    	/*
	        var pp = $('input[id^="SAFEApprover_"]input[id$="_$ClientPeoplePicker_EditorInput"]').attr('aria-label');
	        if (typeof pp === 'undefined' || pp === '') {
	        
	        	$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').css({"border":"1 solid red", "background-color": "#ffdddd"});
	  	        var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">SAFE Approver cannot be blank<br></span></span>";
	  	        if($('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').length <= 0) {
	  	        	$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().append(errorMessage);
	  	        	$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "50px");
	
	  	        }
				
				$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').keypress( function() {
					if($('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').css("background-color") == "rgb(255, 221, 221)") {
		        		$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').css({"border":"", "background-color": ""});
						$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().find('span.ms-csrformvalidation').remove();
						$('div[id^="SAFEApprover_"]div[id$="_$ClientPeoplePicker"]').parent().parent().css("margin-bottom", "20px");
	
					}
				
				});	
	        
	            this.errorInfo.push({name: 'SAFE Approver', message: 'SAFE Approver cannot be blank'});
	            return false;
	        }
	        return true;
	    */
        }
        return true;
    },    
    
    validateInvoiceApprover: function () {
        var pp = $('input[id^="InvoiceApprover_"]input[id$="_$ClientPeoplePicker_HiddenInput"]').attr('value');
        if (typeof pp === 'undefined' || pp === '[]' || pp === '') {
            this.errorInfo.push({name: 'Invoice Approver', message: 'Invoice Approver cannot be blank'});
            return false;
        }
        return true;
    },
    validateAttachment: function () {
    	var addedFileCount = $('#idAttachmentsTable').find('tr').length;
    	if(addedFileCount <= 0) {
    		$('div#AttachmentBtn').css({"border":"1 solid red", "background-color": "#ffdddd"});
    		var errorMessage = "<span class=\"ms-formvalidation ms-csrformvalidation\"><span role=\"alert\">Change Order Attachment cannot be blank<br></span></span>";
    		console.log($('div.attachment-section').html().indexOf(errorMessage));
    		if($('div.attachment-section').html().indexOf(errorMessage) == -1) {
        		$('div.attachment-section').append(errorMessage);
        	}

        	$('div#AttachmentBtn').click( function() {
        		$('div#AttachmentBtn').css({"border":"1px solid gray", "background-color": ""});
				$('div.attachment-section').find('span.ms-formvalidation').remove();
        	});
        	
            this.errorInfo.push({name: 'Change Order Attachment', message: 'Change Order Attachment cannot be blank' });
            return false;
    	}    	
        return true;
    },    
    submitForm: function () {
        var btn = $('input[id$="diidIOSaveItem"]')[1];
        var ioData = this.IOGrid.getCurrentGridData();
       
        $('textarea[id^="IOData_"]textarea[id$="_$TextField"]').val(ioData);
        // $('textarea[id^="iOData_"]textarea[id$="_$TextField"]').val(htmlStr);
        this.validateForm();
        if (this.errorInfo.length > 0) {
            this.showValidationErrors();
        } else {
            $(btn).trigger('click');
        }
    },
    showValidationErrors: function () {
        if (this.errorInfo.length > 0) {
            var div = '';
            for (var i = 0; i < this.errorInfo.length; i++) {
                div += '<div><strong>' + this.errorInfo[i].name + ':</strong>&nbsp;&nbsp;' + this.errorInfo[i].message + '</div>';
            }
            SP.UI.ModalDialog.showErrorDialog('Invalid Submission', div);
        }
    },
    attachmentChanged: function () {
        $('#attachOKbutton').trigger('click');
        $('#onetidIOFile').show();
    },
    /*isAdmin: function () {
        $.ajax({
            type: 'GET',
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/sitegroups/getByName('cmrvreq')/Users?$filter=Id eq " + _spPageContextInfo.userId,
            contentType: 'application/json;odata=verbose',
            headers: {
                'Accept': 'application/json;odata=verbose',
                'X-RequestDigest': $('#__REQUESTDIGEST').val()
            },
            success:function (response) {
                var result = response.d.results;
                if (result.length > 0) {
                    $('.admin-section').show();
                }
            },
            error: function (err) {
                console.log(err);
            }

        });
    }*/
    isAdmin: function () {
        $().SPServices({
		   operation: "GetGroupCollectionFromUser",
		   userLoginName: $().SPServices.SPGetCurrentUser(),
		   async: false,
		   completefunc: function(xData, Status) {
			 if($(xData.responseXML).find("Group[Name='CMRVReq']").length == 1)
			  {
			   if(window.location.href.indexOf('PurchaseOrders/DispForm.aspx')>-1 || window.location.href.indexOf('PurchaseOrders/EditForm.aspx')>-1 )
			     $('.AdminCoSection').show();
			     
			   if(window.location.href.indexOf('PurchaseOrders/newform.aspx')>-1)
			     $('.AdminCoSection').hide();

			  }
			  else 
			  $('.AdminCoSection').hide();
			 }
		}); 
    }
};

function IOGrid (formType) {
    this.activeQuarter = {half: 1, data: []};
    this.formType = formType;
    this.months = [
        { name: 'JUL', index: 7, half: 1 },
        { name: 'AUG', index: 8, half: 1 },
        { name: 'SEP', index: 9, half: 1 },
        { name: 'OCT', index: 10, half: 1 },
        { name: 'NOV', index: 11, half: 1 },
        { name: 'DEC', index: 12, half: 1 },
        { name: 'JAN', index: 1, half: 2 },
        { name: 'FEB', index: 2, half: 2 },
        { name: 'MAR', index: 3, half: 2 },
        { name: 'APR', index: 4, half: 2 },
        { name: 'MAY', index: 5, half: 2 },
        { name: 'JUN', index: 6, half: 2 }
    ];
    $('#addNewRowContainer').click(this.addRow.bind(this));
    $('#nextQuarter').parent().click(this.nextQuarter.bind(this));
    $('#previousQuarter').parent().click(this.previousQuarter.bind(this));
    $('.io-grid-input').change(this.calculateTotals.bind(this));
    $('input[id^="POTotal_"]input[id$="_$CurrencyField"]').change(this.calculateTotals.bind(this));

    
}
IOGrid.prototype = {
    constructor: IOGrid,
    setData: function (data) {
        this.activeQuarter = {half: 1, data: data};
        this.buildGrid();
        this.calculateTotals();
    },
    buildGrid: function () {
        $('.IOGrid-Container').find('tbody').empty();
        var that = this;

        if (this.activeQuarter.data.length === 0) {
            this.addRow();
        } else {
            for (var i = 0; i < this.activeQuarter.data.length; i++) {
                var data = this.activeQuarter.data[i];
                this.addRow(data);
            }
        }
    },
    nextQuarter: function () {
        if (this.activeQuarter.half + 1 <= 2) {
            $('.month-h' + this.activeQuarter.half).addClass('month-column');
            this.activeQuarter.half += 1;
            $('.month-h' + this.activeQuarter.half).removeClass('month-column');
        }
    },
    previousQuarter: function () {
        if (this.activeQuarter.half - 1 > 0) {
            $('.month-h' + this.activeQuarter.half).addClass('month-column');
            this.activeQuarter.half -= 1;
            $('.month-h' + this.activeQuarter.half).removeClass('month-column');
        }
    },
    currencyFieldChanged: function (e) {
        var value = $(e.currentTarget).val();
        if (value !== '') {
            value = Number(decommafyNum(value));
            value = value.toFixed(2);
            $(e.currentTarget).val(commafyNum(value));
        }
    },
    addRow: function (rowObj) {
        var tbody = $('.IOGrid-Container').find('tbody');
        var tr = $('<tr />');
        tr.append($('<td />', {'class': 'width-5'}).append($('<img />', {'class': 'delete-img', 
            src: 'https://microsoft.sharepoint.com/teams/cmrcentral/Style%20Library/CMRCentral/Images/suppliers/purple_x.png' }).click(this.removeRow.bind(this))));
        tr.append($('<td />', {'class': 'width-120'}).append($('<input />', {type: 'text', 'class': 'width-120 po-number-field', placeholder: 'Enter IO Number...', value: typeof rowObj !== 'undefined' ? rowObj.ponumber : ''})));
        tr.append($('<td />', {'class': 'width-100 month-column month-h1'}).append($('<input />', {type: 'text', 'class': 'io-grid-input input-jul', placeholder: '$', value: typeof rowObj !== 'undefined' ? rowObj.month7 : ''})));
        tr.append($('<td />', {'class': 'width-100 month-column month-h1'}).append($('<input />', {type: 'text', 'class': 'io-grid-input input-aug', placeholder: '$', value: typeof rowObj !== 'undefined' ? rowObj.month8 : ''})));
        tr.append($('<td />', {'class': 'width-100 month-column month-h1'}).append($('<input />', {type: 'text', 'class': 'io-grid-input input-sep', placeholder: '$', value: typeof rowObj !== 'undefined' ? rowObj.month9 : ''})));
        tr.append($('<td />', {'class': 'width-100 month-column month-h1'}).append($('<input />', {type: 'text', 'class': 'io-grid-input input-oct', placeholder: '$', value: typeof rowObj !== 'undefined' ? rowObj.month10 : ''})));
        tr.append($('<td />', {'class': 'width-100 month-column month-h1'}).append($('<input />', {type: 'text', 'class': 'io-grid-input input-nov', placeholder: '$', value: typeof rowObj !== 'undefined' ? rowObj.month11 : ''})));
        tr.append($('<td />', {'class': 'width-100 month-column month-h1'}).append($('<input />', {type: 'text', 'class': 'io-grid-input input-dec', placeholder: '$', value: typeof rowObj !== 'undefined' ? rowObj.month12 : ''})));
        tr.append($('<td />', {'class': 'width-100 month-column month-h2'}).append($('<input />', {type: 'text', 'class': 'io-grid-input input-jan', placeholder: '$', value: typeof rowObj !== 'undefined' ? rowObj.month1 : ''})));
        tr.append($('<td />', {'class': 'width-100 month-column month-h2'}).append($('<input />', {type: 'text', 'class': 'io-grid-input input-feb', placeholder: '$', value: typeof rowObj !== 'undefined' ? rowObj.month2 : ''})));
        tr.append($('<td />', {'class': 'width-100 month-column month-h2'}).append($('<input />', {type: 'text', 'class': 'io-grid-input input-mar', placeholder: '$', value: typeof rowObj !== 'undefined' ? rowObj.month3 : ''})));
        tr.append($('<td />', {'class': 'width-100 month-column month-h2'}).append($('<input />', {type: 'text', 'class': 'io-grid-input input-apr', placeholder: '$', value: typeof rowObj !== 'undefined' ? rowObj.month4 : ''})));
        tr.append($('<td />', {'class': 'width-100 month-column month-h2'}).append($('<input />', {type: 'text', 'class': 'io-grid-input input-may', placeholder: '$', value: typeof rowObj !== 'undefined' ? rowObj.month5 : ''})));
        tr.append($('<td />', {'class': 'width-100 month-column month-h2'}).append($('<input />', {type: 'text', 'class': 'io-grid-input input-jun', placeholder: '$', value: typeof rowObj !== 'undefined' ? rowObj.month6 : ''})));
        tbody.append(tr);
        $('.io-grid-input').change(this.calculateTotals.bind(this));
        $('.io-grid-input').change(this.currencyFieldChanged.bind(this));
        var trCount = tbody.find('tr').length;
        $('#poNumCount').text(trCount);
        $('.month-h' + this.activeQuarter.half).removeClass('month-column');
    },
    removeRow: function (e) {

        $(e.currentTarget).closest('tr').remove();
        var tbody = $('.IOGrid-Container').find('tbody');
        if (tbody.find('tr').length === 0) {
            this.addRow();
        }
        var trCount = tbody.find('tr').length;
        $('#poNumCount').text(trCount);
        this.calculateTotals();
    },
    calculateTotals: function (e) {
        var columns = [
            $('.input-jul'), $('.input-aug'), $('.input-sep'), 
            $('.input-oct'), $('.input-nov'), $('.input-dec'),
            $('.input-jan'), $('.input-feb'), $('.input-mar'),
            $('.input-apr'), $('.input-may'), $('.input-jun')
        ];

        for (var i = 0; i < columns.length; i++) {
            var col = columns[i];
            var total = 0.00;
            var month = '';
            col.each(function (index, item) {

                var field = $(item);
                var className = field.attr('class');
                month = className.substring(className.indexOf('input-') + 6);
                if (field.val() !== '') {
                    //var num = +field.val();
                    var num = Number(decommafyNum(field.val()));
                    total += num
                }
            });

            $('#' + month + 'Total').text(commafyNum(total.toFixed(2)));
        }
        this.calculateTotalPO();

    },
    calculateTotalPO: function () {
        var inputs = $('.io-grid-input');
        var total = 0.00;
        var POTotal = 0.00;
        if (this.formType.name === 'Purchase Order') {
            if (this.formType.mode === 'newform.aspx' || this.formType.mode === 'editform.aspx') {
                POTotal = $('input[id^="POTotal_"]input[id$="_$CurrencyField"]').val();
            } else if (this.formType.mode === 'dispform.aspx') {
                POTotal = $('#POTotal input').val();
                if (POTotal) {
                    POTotal = POTotal.replace('$', '');
                }
            }
        }
        inputs.each(function (index, item) {
            var amount = $(item).val();
            if (amount === '') {
                amount = 0.00;
            } else {
                //total += +amount; 
                total += Number(decommafyNum(amount));            
            }
        });


        $('#poTotal').text(commafyNum(total.toFixed(2)));
        //var totalEntered = +total.toFixed(2);
        var totalEntered = Number(decommafyNum(total.toFixed(2)));
        var poTotal = (POTotal === "" || POTotal === 0) ? 0 : Number(Number(decommafyNum(POTotal)).toFixed(2));
        if (this.formType.name === 'Purchase Order') {
            if (totalEntered <= poTotal) {
                $('.amount-container').css({'color': 'green'});
            } else {
                $('.amount-container').css({'color': 'red'});
            }
        }
    },
    getCurrentGridData: function () {
        var tbody = $('.IOGrid-Container').find('tbody');
        var trs = tbody.find('tr');
        var data = [];
        htmlStr='';
        for (var i = 0; i < trs.length; i++) {
            var tr = $(trs[i]);
            var row = {
                ponumber: tr.find('.po-number-field').val(),
                month7: tr.find('.input-jul').val(), 
                month8: tr.find('.input-aug').val(), 
                month9: tr.find('.input-sep').val(), 
                month10: tr.find('.input-oct').val(), 
                month11: tr.find('.input-nov').val(), 
                month12: tr.find('.input-dec').val(), 
                month1: tr.find('.input-jan').val(), 
                month2: tr.find('.input-feb').val(), 
                month3: tr.find('.input-mar').val(), 
                month4: tr.find('.input-apr').val(),
                month5: tr.find('.input-may').val(), 
                month6: tr.find('.input-jun').val(), 

            };
            data.push(row);
            
			htmlStr += (
			  '<pre style="margin:0">' +
			  "IO# " + row.ponumber + "<br />" +
			  (row.month1 ? "Jan $" + row.month1 + "<br />" : "") +
			  (row.month2 ? "Feb $" + row.month2 + "<br />" : "") +
			  (row.month3 ? "Mar $" + row.month3 + "<br />" : "") +
			  (row.month4 ? "Apr $" + row.month4 + "<br />" : "") +
			  (row.month5 ? "May $" + row.month5 + "<br />" : "") +
			  (row.month6 ? "Jun $" + row.month6 + "<br />" : "") +
			  (row.month7 ? "Jul $" + row.month7 + "<br />" : "") +
			  (row.month8 ? "Aug $" + row.month8 + "<br />" : "") +
			  (row.month9 ? "Sep $" + row.month9 + "<br />" : "") +
			  (row.month10 ? "Oct $" + row.month10 + "<br />" : "") +
			  (row.month11 ? "Nov $" + row.month11 + "<br />" : "") +
			  (row.month12 ? "Dev $" + row.month12 + "<br />" : "") +
			  "</pre>"
			)

/*            
            htmlStr+=   "<div style='margin-bottom:10px'>"+
                         "<div><span>PO#: "+row.ponumber+" </span></div>"+
                         "<div><span>Jan: $"+row.month1+" </span></div>"+
                         "<div><span>Feb: $"+row.month2+" </span></div>"+
                         "<div><span>Mar: $"+row.month3+" </span></div>"+
                         "<div><span>Apr: $"+row.month4+" </span></div>"+
                         "<div><span>May: $"+row.month5+" </span></div>"+
                         "<div><span>Jun: $"+row.month6+" </span></div>"+
                         "<div><span>Jul: $"+row.month7+" </span></div>"+
                         "<div><span>Aug: $"+row.month8+" </span></div>"+
                         "<div><span>Sep: $"+row.month9+" </span></div>"+
                         "<div><span>Oct: $"+row.month10+" </span></div>"+
                         "<div><span>Nov: $"+row.month11+" </span></div>"+
                         "<div><span>Dec: $"+row.month12+" </span></div>"+
                         "</div>";
*/
        }
        
                                 
        return JSON.stringify(data);
    } 
   
};

function adminSection(){
  if(window.location.href.indexOf('PurchaseOrders/newform.aspx')>-1)
   {
   
   }
   
   if(window.location.href.indexOf('PurchaseOrders/DispForm.aspx')>-1 || window.location.href.indexOf('PurchaseOrders/EditForm.aspx')>-1 )
  {
	   $().SPServices({
		   operation: "GetGroupCollectionFromUser",
		   userLoginName: $().SPServices.SPGetCurrentUser(),
		   async: false,
		   completefunc: function(xData, Status) {
			 if($(xData.responseXML).find("Group[Name='CMRPO']").length == 1)
			  {
			   alert('Yes')
			  }
			  else
			  {
			  alert('No');
			  }
		   }
		}); 
  
  }

}

$(document).ready(function () {

	// Load SP.Taxonomy.js for term store
	var scriptbase = "https://microsoft.sharepoint.com/teams/cmrcentral/_layouts/15/";
	//$.getScript(scriptbase + "SP.Taxonomy.js", checkSharePointTaxonomyService);    
    
    var contentTypeId = '';
    var htmlStr='';
    try {
	    var arr = window.location.href.split('?');
	    var args = arr[1].split('&');
	    var contentType = args.filter(function (el) {return el.indexOf('ContentTypeId') > -1;})[0];
	    contentTypeId = contentType.replace('ContentTypeId=', '');
    } catch (e) {
    	if ($('select[id$="ContentTypeChoice"]').val()) {
    		contentTypeId = $('select[id$="ContentTypeChoice"]').val();
    	}
    }
    if (contentTypeId === '0x010034A1913A5076DA42852F4BEF901F43490011A6056618DC914CB6BF4D439BB78A5F' || contentTypeId === 'Change Order') {
        $('#poRequestContainer').remove();
        new ChangeOrderForm();
    } else if (typeof contentTypeId === 'undefined' || contentTypeId === '0x010020E6A0AFF39DF142B5D63489DA6864DE00B4BA695332914F46B60DB8EF8A9E0C09' || contentTypeId === 'Purchase Order' || contentTypeId === '') {
    	// 02/08/2019 - commented out prerequisite of SP.Taxonomy.js
    	//$.getScript(scriptbase + "SP.Taxonomy.js", checkSharePointTaxonomyService);
    	checkSharePointTaxonomyService();
        $('#coRequestContainer').remove();
        new PORequestForm();
    }
    
    //adminSection();
   	$('link[href="https://ajax.aspnetcdn.com/ajax/jquery.ui/1.10.4/themes/le-frog/jquery-ui.css"]').remove();
});

function checkSharePointTaxonomyService() {
	// Term store arraies
	var cmrdocTypeArray = [];

	var cmrdocType = retriveTerms();
	cmrdocType.done(function(result) { 
        var termEnumerator = result.getEnumerator();	
		while (termEnumerator.moveNext()) {	
			var currentTerm = termEnumerator.get_current();	
		    cmrdocTypeArray.push(currentTerm.get_name());	
		}
		console.log(cmrdocTypeArray);
    });
}

function retriveTerms() {
	var termList = $.Deferred(function() {
		var context = new SP.ClientContext.get_current();
		SP.SOD.executeFunc("SP.Taxonomy.js", 'SP.ClientContext', function () {
			
		    //Current Taxonomy Session
		    var taxSession = SP.Taxonomy.TaxonomySession.getTaxonomySession(context);
		
		    //Term Stores
		    var termStores = taxSession.get_termStores();
		
		    //Name of the Term Store from which to get the Terms.
		    var termStore = termStores.getByName("Taxonomy_KjcQP19RhWtHes5PMcbcuw==");
			//var termStore = termStores.getByName("Taxonomy_cpB75vYHfrG6ZFYRf39/ow==");

		
		    //GUID of Term Set from which to get the Terms.
		    var termSet = termStore.getTermSet("c7ce3c9c-d426-4f6f-bdee-1a8eda339cf0");	
		    var terms = termSet.getAllTerms();	
		    context.load(terms);
		   		    			
		    context.executeQueryAsync(function () {	
		    	termList.resolve(terms);

		    }, function (sender, args) {
		    	$("#dialog").dialog({
			      resizable: false,
			      height: "auto",
			      width: 400,
			      modal: true,
			    }
		    	
		    	);	
		        console.log(args.get_message());
		
		    });
		});
	});
    return termList.promise();

}



function flexToggle(elem){
	var e = $(elem);
	
	if(e.css('display') == "flex"){
		e.css('display', 'none');
	}
	else{
		e.css('display', 'flex');
	}
}

		function AttachFile(){
		ULSopi:;
		fileID=FileuploadString+FileUploadIndex;
		fileInput=GetAttachElement(fileID);
		filename=TrimWhiteSpaces(fileInput.value);
		if(!filename)
		{var L_FileNameRequired_TXT="You must specify a non-blank value for File Name.";
		alert(L_FileNameRequired_TXT);fileInput.focus()
		}else{var L_FileUploadToolTip_text="Name";
		oRow=document.getElementById("idAttachmentsTable").insertRow(-1);
		RowID="attachRow"+FileUploadIndex;
		oRow.id=RowID;
		oCellFileName=oRow.insertCell(-1);
		oCellFileName.className="ms-vb";
		oCellFileName.innerHTML='<span dir="ltr">'+filename+"</span>&nbsp;&nbsp;&nbsp;&nbsp;";
		oCellControl=oRow.insertCell(-1);oCellControl.className="ms-propertysheet";
		oCellControl.innerHTML="<IMG SRC='"+document.getElementsByName("RectGifUrl").item(0).value+"'>&nbsp;<a href='javascript:RemoveLocal(\""+RowID+'","'+fileID+"\")'>"+L_Delete_Text+"</a>";
		fileInput.style.display="none";
		++FileUploadIndex;
		oAttachments=document.getElementById("attachmentsOnClient");
		var a=document.createElement("input");
		a.tabIndex="1";a.type="File";
		a.className="ms-longfileinput";
		a.title=L_FileUploadToolTip_text;
		a.name=FileuploadString+FileUploadIndex;
		a.id=FileuploadString+FileUploadIndex;
		a.size="56";oAttachments.appendChild(a);
		var b=fileInput.form;b.encoding="multipart/form-data";
		document.getElementById("idAttachmentsRow").style.display="";
		ShowPartCustom()}}
		
		function ShowPartCustom(){
		ULSopi:;
		document.getElementById("partAttachment").style.display="none";
		document.getElementById("part1").style.display="block";
		var a=document.getElementById("s4-ribbonrow");
		if(a!=null)a.style.display="none";
		FixRibbonAndWorkspaceDimensions();
		typeof frm!="undefined"&&frm.SetFirstFocus(true)}
		
