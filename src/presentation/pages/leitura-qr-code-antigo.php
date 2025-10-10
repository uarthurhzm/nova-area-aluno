<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/webrtc-adapter/3.3.3/adapter.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.10/vue.min.js"></script>
<script type="text/javascript" src="https://rawgit.com/schmich/instascan-builds/master/instascan.min.js"></script>
<!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">-->
<!--<link rel="stylesheet" href="https://cdn.usebootstrap.com/bootstrap/5.0.1/css/bootstrap.min.css">-->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" rel="stylesheet">
<?= $this->headScript()

    ->prependFile($this->basePath('novo/js/jquery-3.1.0.min.js'))
?>

<style>
    .modal {
        background-color: rgba(0, 0, 0, .8);
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: none;
    }

    .modal-content {
        margin: 0 auto;
        margin-top: 3%;
        max-width: 1000px;
        background-color: #eee;
        padding: 0;
        box-shadow: 0 0 2px #fff;
    }

    .modal-header h1 {
        font-weight: bold;
        text-align: center;
    }

    .modal-header,
    .modal-body,
    .modal-footer {
        padding: 4px;
    }

    .modal-header {
        background-color: #ccc;
    }

    .modal-footer {
        background-color: #ccc;
    }

    /*.tata {
        width: 500px;
        overflow: hidden;
        display: block;
        height: 500px;
    }*/
    video-view {
        position: relative;
        width: 300px;
        height: 100px;
    }

    .video-view .video {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-color: #ccc;
    }

    .video-view .video-content {
        position: absolute;
        top: 100px;
    }
</style>
<script>
    var lat = '';
    var long = '';
    document.addEventListener("DOMContentLoaded", function(e) {
        navigator.geolocation.getCurrentPosition(successFunction);
        if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
            $("#div_qr_code_number").show()
            $("#not_iphone").hide()
            $("#leitura_qrcode").html('Presença Por Código')
            $("#msg_not_iphone").html('Digite o código informado pelo professor, e clique em enviar.')
        } else {
            $("#not_iphone").show()
        }

    })

    function successFunction(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;

    }

    function marca_presenca(id) {
        $("#title_html").html('');
        $("#body_html").html('');
        $("#dv-modal").hide();

        $.ajax({
            type: "POST",
            url: "<?php echo $this->url('home-aluno/default', array('controller' => 'home', 'action' => 'marca-presenca')); ?>",
            data: {
                id_qrcode: id,
                latitude: lat,
                longitude: long
            }
        }).done(function(ret) {
            $("#dv-modal").show()
            $("#preview").hide()

            if (ret.status) {
                $("#title_html").html('Sucesso!')
                $("#body_html").html('<h4>' + ret.msg + '</h4>')
            } else {
                $("#title_html").html('Atenção!')
                $("#body_html").html('<h4>' + ret.msg + '</h4>')

            }

        })
    }

    function change_camera() {
        //location.href = 'https://apps.unilago.edu.br/aluno/home/leitura-frontal';
        document.location.href = 'https://apps.unilago.edu.br/aluno/home/leitura-frontal';
        //window.open('https://apps.unilago.edu.br/aluno/home/leitura-frontal');
    }
</script>

<!--<div class="col-md-12">
    <h6 style="text-align:right"><?php echo $this->identity()->NM_ALU; ?></h6>
</div>
<div class=" ">
    <div class="col-md-12" style="text-align:center;">
        <h1 style="font-size:3vh">Leitura de QRCODE</h1>
        <h6 style="font-size:2vh">Habilite a localização, e a camera para marcar sua presença.</h6>
    </div>
    <hr>


  
</div>




-->

<div id="dv-modal" class="modal" id="display:none;">
    <div class="modal-content">
        <div class="modal-header">
            <h3 id="title_html"></h3>
        </div>

        <div class="modal-body" id="body_html">



        </div>

        <div class="modal-footer">
            <button class="btn" style="width:100%" onclick="window.location.reload();">Fechar</button>
        </div>
    </div>
</div>

<div class="form-control">
    <div class="row">
        <div class="col-md-12">
            <h6 class="float-right"><?php echo $this->identity()->NM_ALU; ?></h6>
        </div>
    </div>
    <hr>
    <div class="row" style="text-align:center;">
        <div class="col-md-12" style="text-align:center;">
            <h1 style="font-size:4vh" id="leitura_qrcode">Leitura de QRCODE</h1>

        </div>
    </div>
    <div class="row">
        <div class="col-md-6 offset-3" style="text-align:center;">

            <h6 style="font-size:2vh" id="msg_not_iphone">Habilite a localização, e a câmera para marcar sua presença.</h6>
            <div class="row" id="div_qr_code_number" style="display:none;text-align:center;">
                <input type="number" id="qr_code_number" style="width:80%;"></input>
                <button class="btn btn-primary" onclick="javascript:marca_presenca()">Enviar</button>
            </div>

        </div>

    </div>
    <div class="row" style="margin-top:5%;" id="not_iphone">
        <div class="col-md-12 tata video-view">
            <!-- <select class="form-control" id="select_camera" style="width:100%;" onchange="">
                <option selected disabled>
                    <p style="font-size:5vh">Camera Trazeira</p>
                </option>
                <option>
                    <p style="font-size:5vh">Camera Frontal</p>
                </option>
            </select>-->
            <div class="col-md-4" style="display:none">
                <label>scan</label>
                <input type="text" name="text" id="text" readonyy="" placeholder="scan qrcode" class="form-control">
            </div>
            <video id="preview" style="width:950px"></video>
            <div class="video-content">
                <button onclick="javascript:change_camera()"><img style="width:100px;" src="/img/rotation.png"></button>
            </div>
        </div>
    </div>
</div>
<script>
    let scanner = new Instascan.Scanner({
        video: document.getElementById('preview'),
        mirror: false
    });
    Instascan.Camera.getCameras().then(function(cameras) {

        /* for(let x = 0; x < cameras.length; x++){
             $("#select_camera").append('<option>'+x+'</option>')
         }*/
        //$("#select_camera").attr('onchange', 'javascript:teste(' + cameras + ',' + scanner + ')')
        if (cameras.length > 0) {
            var selectedCam = cameras[0];
            $.each(cameras, (i, c) => {
                if (c.name.indexOf('back') !== -1) {
                    selectedCam = c;
                    return false;
                }
            });

            scanner.start(selectedCam);
        }

    }).catch(function(e) {
        console.error(e)
    })
    scanner.addListener('scan', function(c) {
        document.getElementById('text').value = c;
        marca_presenca(c)
    })
</script>