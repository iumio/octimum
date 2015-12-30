/**
 * Created by rafina on 19/12/15.
 */

$(document).ready(function () {

    $("a[href='#makeQuery']").each(function () {
        $(this).click(function (e) {
            e.preventDefault();
            $("#home").hide();
            $("#showDB").hide();
            $("#makeQuery").show();
            $("#showInfo").hide();
            $("#showStruct").hide();
        });
    });

    $("a[href='#showDB']").each(function () {
        $(this).click(function (e) {
            e.preventDefault();
            $("#showDB").show();
            $("#makeQuery").hide();
            $("#home").hide();
        });
    });

    $("a[href='#showInfo']").each(function () {
        $(this).click(function (e) {
            e.preventDefault();
            $("#showInfo").show();
            $("#makeQuery").hide();
            $("#home").hide();
        });
    });
    $("a[href='#showStruct']").each(function () {
        $(this).click(function (e) {
            e.preventDefault();
            $("#showStruct").show();
            $("#makeQuery").hide();
            $("#home").hide();
        });
    });

    $(".btn-add-table").each(function () {
        $(this).click(function (e) {
            e.preventDefault();
            $("#modal_add_table").modal('show');
        });
    });

    $(".btn-rename").each(function () {
        $(this).click(function (e) {
            e.preventDefault();
            $("#modal_rename_db").modal('show');
        });
    });

    $(".btn-delete-db").each(function () {
        $(this).click(function (e) {
            e.preventDefault();
            $("#modal_drop_db").modal('show');
        });
    });

    $(".btn-delete-the-table").each(function () {
        $(this).click(function (e) {
            e.preventDefault();
            $("#modal_delete_table").modal('show');
        });
    });

    $(".btn-delete-table").click(function (e) {
        var table_name = $(this).attr("name");
        e.preventDefault();
        $("#modal_delete_table").modal('show');
        $(".text-info").html(table_name);
        $("input[name='table_name_delete']").val(table_name);
    });

    $(".btn-delete-db-in-list").click(function (e) {
        var db_name = $(this).attr("name");
        e.preventDefault();
        $("#modal_drop_db").modal('show');
        $(".text-info").html(db_name);
        $("input[name='db_name_delete']").val(db_name);
    });

    $("#new_table_name").focus(function (e) {
        $(".btn-add-field-in-tab").show();
        $("#tab_add_field").show();
    });

    $("select[name='select_default']").change(function () {
        var value = $(this).val();
        if(value == "def")
        {
            $("input[name='default']").show();
        }
    });

    $(".btn-add-field-in-tab").click(function (e) {
        e.preventDefault();
        $("#tab_add_field").prepend("<tr><td><input type='text' class='form-control' name='field_name'/> </td> <td> <input type='text' class='form-control' name='field_type' placeholder='INT, VARCHAR, FLOAT...'/> </td> <td> <input type='text' class='form-control' name='field_size'/> </td> <td> <select name='select_default'> <option selected>Aucune</option> <option value='def'>Tel que défini : </option> <option value='NULL'>NULL</option> <option value='CURRENT_TIMESTAMP'>CURRENT_TIMESTAMP</option> </select> <input type='text' class='form-control input-sm noShow marginTop20' name='default'/> </td> <td> <div class='checkbox'> <label> <input type='checkbox'> </label> </div> </td> <td> <select name='select_default'> <option selected>---</option> <option value='PRIMARY'>PRIMARY</option> <option value='UNIQUE'>UNIQUE</option> <option value='INDEX'>INDEX</option> <option value='FULLTEXT'>FULLTEXT</option> </select> </td> <td> <div class='checkbox'> <label> <input type='checkbox'> </label> </div> </td> </tr>");
    });

    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    $("#form_add_db").each(function(){
        $(this).submit(function(e)
        {
            e.preventDefault();
            var name_db = $("input[name='dbName']").val();
            var rq = $.ajax({
                url: 'index.php?run=addDB&nameDB='+name_db,
                method: "POST"
            });
            rq.success(function(result)
            {
                console.log(result);
                if (result != 1)
                {
                    $("#modal_add_db").find(".modal-body").html("<p>Erreur de type [SQL]</p><p>"+result+"</p>");
                    $("#modal_add_db").css("background-color","rgba(246,184,173,0.7)");
                    $("#modal_add_db").modal("show");
                }
                else
                {
                    $("#modal_add_db").find(".modal-body").html("<p>Votre nouvelle base à été ajoutée</p>");
                    $("#modal_add_db").css("background-color","rgba(148,251,146,0.7)");
                    $("#modal_add_db").find(".modal-footer").hide();
                    $("#modal_add_db").modal("show");
                    window.setTimeout(function() {
                        window.location.href = 'index.php?run=showDB&value='+name_db;
                    }, 3000);
                }
            })
        })
    });

    $(".form_rename_db").each(function () {
        $(this).submit(function (e) {
            e.preventDefault();
            $("#modal_rename_db").modal('hide');
            var name_db = $("input[name='db_name']").val();
            var n_name_db = $("input[name='new_db_name']").val();
            var rq = $.ajax({
                url: 'index.php?run=renameDB&nameDB='+name_db+'&newDBName='+n_name_db,
                //data: {'nameDB':name_db,'newDBName': n_name_db },
                method: "POST"
            });
            rq.success(function (result) {
                console.log(result);
                $("#modal_info").modal("hide");
                if (result != 1) {
                    $("#modal_info").find(".modal-body").html("<p>Erreur de type [SQL]</p><p>" + result + "</p>");
                    $("#modal_info").css("background-color", "rgba(246,184,173,0.7)");
                    $("#modal_info").modal("show");
                }
                else {
                    $("#modal_info").find(".modal-body").html("<p>Le nom de la base à été changé</p>");
                    $("#modal_info").css("background-color", "rgba(148,251,146,0.7)");
                    $("#modal_info").find(".modal-footer").hide();
                    $("#modal_info").modal("show");
                    window.setTimeout(function () {
                        window.location.href = 'index.php?run=showDB&value=' + n_name_db;
                    }, 3000);
                }
            })
        })
    });

    $(".form_delete_db").each(function () {
        $(this).submit(function (e) {
            e.preventDefault();
            $("#modal_drop_db").modal('hide');
            var name_db = $("input[name='db_name_delete']").val();
            var rq = $.ajax({
                url: 'index.php?run=deleteDB&nameDB='+name_db,
                //data: {'nameDB':name_db },
                method: "POST"
            });
            rq.success(function (result) {
                console.log(result);
                $("#modal_info").modal("hide");
                if (result != 1) {
                    $("#modal_info").find(".modal-body").html("<p>Erreur de type [SQL]</p><p>" + result + "</p>");
                    $("#modal_info").css("background-color", "rgba(246,184,173,0.7)");
                    $("#modal_info").modal("show");
                }
                else {
                    $("#modal_info").find(".modal-body").html("<p>La base de donnée à été supprimée</p>");
                    $("#modal_info").css("background-color", "rgba(148,251,146,0.7)");
                    $("#modal_info").find(".modal-footer").hide();
                    $("#modal_info").modal("show");
                    window.setTimeout(function () {
                        window.location.href = 'index.php?run=indexAction';
                    }, 3000);
                }
            })
        })
    });

    $(".form_delete_table").each(function () {
        $(this).submit(function (e) {
            e.preventDefault();
            $("#modal_delete_table").modal('hide');
            var name_db = $("input[name='name_db']").val();
            var name_table = $(".text-info").html();
            var rq = $.ajax({
                url: 'index.php?run=delete_table&name_db='+name_db+'&name_table='+name_table,
                //data: {'nameDB':name_db },
                method: "POST"
            });
            rq.success(function (result) {
                console.log(result);
                $("#modal_info").modal("hide");
                if (result != 1) {
                    $("#modal_info").find(".modal-body").html("<p>Erreur de type [SQL]</p><p>" + result + "</p>");
                    $("#modal_info").css("background-color", "rgba(246,184,173,0.7)");
                    $("#modal_info").modal("show");
                }
                else {
                    $("#modal_info").find(".modal-body").html("<p>La table à été supprimée</p>");
                    $("#modal_info").css("background-color", "rgba(148,251,146,0.7)");
                    $("#modal_info").find(".modal-footer").hide();
                    $("#modal_info").modal("show");
                    window.setTimeout(function () {
                        window.location.href = 'index.php?run=showDB&value=' +name_db;
                    }, 3000);
                }
            })
        })
    });
});
