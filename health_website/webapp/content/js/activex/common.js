var isLoadAxSucc = true;
function NotInstall() {
    isLoadAxSucc = false;
}

function displayErrorInfo()
{
	var errcode = document.getElementById("basicPanel").VGSIIActiveX_GetLastErrorCode();
	var errinfo = document.getElementById("basicPanel").VGSIIActiveX_GetLastErrorInfoDescription(errcode);
	ShowFailure(errinfo);
}

function showErrorDescription(errmsg)
{
	ShowFailure(errmsg);
}

